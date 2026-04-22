// sync-rss — Supabase Edge Function
//
// Fetches each verified source's RSS feed and upserts articles into the
// `articles` table. Call this manually to seed, or schedule via Supabase
// Dashboard → Cron Jobs (every hour: "0 * * * *").
//
// Deploy: Supabase Dashboard → Edge Functions → New Function → paste this

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, // set this in Edge Function secrets
);

Deno.serve(async () => {
  const { data: sources, error } = await supabase
    .from('sources')
    .select('id, name, rss_url')
    .eq('verified', true)
    .not('rss_url', 'is', null);

  if (error || !sources) {
    return new Response(JSON.stringify({ error: 'Could not load sources' }), { status: 500 });
  }

  const results: Record<string, number> = {};

  for (const source of sources) {
    try {
      const res = await fetch(source.rss_url, {
        headers: { 'User-Agent': 'TheLoDown RSS Sync/1.0' },
      });
      if (!res.ok) { results[source.id] = 0; continue; }

      const xml = await res.text();
      const articles = parseRSS(xml, source.id);

      if (articles.length > 0) {
        const { error: upsertErr } = await supabase
          .from('articles')
          .upsert(articles, { onConflict: 'id', ignoreDuplicates: false });
        results[source.id] = upsertErr ? 0 : articles.length;
      } else {
        results[source.id] = 0;
      }
    } catch (e) {
      console.error(`${source.id} failed:`, e);
      results[source.id] = -1;
    }
  }

  return new Response(JSON.stringify({ synced: results }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// ── RSS parser ────────────────────────────────────────────────────────────────
// Handles CDATA, common RSS 2.0 fields, and basic entity decoding.

function parseRSS(xml: string, sourceId: string) {
  const items: object[] = [];
  const itemBlocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  for (const block of itemBlocks.slice(0, 20)) {
    const item = block[1];
    const guid = extract(item, 'guid') || extract(item, 'link');
    if (!guid) continue;

    const pubDate = extract(item, 'pubDate');

    items.push({
      id: `${sourceId}::${guid}`.slice(0, 500),
      source_id: sourceId,
      headline: clean(extract(item, 'title') || ''),
      excerpt: clean(stripHtml(extract(item, 'description') || '')).slice(0, 400),
      author: clean(extract(item, 'dc:creator') || extract(item, 'author') || ''),
      url: extract(item, 'link') || guid,
      published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      tags: extractTags(item),
    });
  }

  return items;
}

function extract(xml: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? m[1].trim() : null;
}

function extractTags(item: string): string[] {
  const cats = [...item.matchAll(/<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi)];
  return [...new Set(cats.map(m => m[1].trim().toLowerCase()).filter(Boolean))];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function clean(str: string): string {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
    .trim();
}
