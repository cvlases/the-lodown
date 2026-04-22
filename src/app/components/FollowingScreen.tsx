// FollowingScreen.tsx — manage your personal news collections
//
// Three sections:
//   1. What You're Following — per-category search dropdowns to follow
//      authors, sources, places, and topics from real DB data
//   2. Your Feed — articles filtered by active tags (OR logic)
//   3. Browse By — newspaper-column style (Stories / Authors / Sources)

import { useEffect, useMemo, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { SOURCES } from '../../lib/sources';

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = 'authors' | 'sources' | 'places' | 'topics';

interface Article {
  id: string;
  source_id: string;
  source_name: string;
  headline: string;
  excerpt: string;
  author: string;
  url: string;
  published_at: string;
  tags: string[];
}

const EMPTY_FOLLOWING: Record<Category, string[]> = {
  authors: [],
  sources: [],
  places:  [],
  topics:  [],
};

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'authors', label: 'AUTHORS' },
  { key: 'sources', label: 'SOURCES' },
  { key: 'places',  label: 'PLACES'  },
  { key: 'topics',  label: 'TOPICS'  },
];

// ── Default filler suggestions for new users (from Pittsburgh news coverage) ──

const DEFAULT_TOPICS = [
  'Local Politics',
  'Government',
  'Business',
  'Sports',
  'Education',
  'Public Safety',
  'Environment',
  'Arts & Culture',
  'Opinion',
  'Investigations',
];

const DEFAULT_PLACES = [
  'Pittsburgh',
  'Allegheny County',
  'Downtown Pittsburgh',
  'North Shore',
  'Strip District',
  'Oakland',
  'South Side',
  'East Pittsburgh',
  'Point Breeze',
  'Lawrenceville',
  'Pennsylvania',
  'Western Pennsylvania',
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FollowingScreen({ user }: { user: User | null }) {
  const [following, setFollowing] = useState(EMPTY_FOLLOWING);
  const [rawArticles, setRawArticles] = useState<Omit<Article, 'source_name'>[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // Search options per category
  const [searchOptions, setSearchOptions] = useState<Record<Category, string[]>>({
    authors: [],
    sources: SOURCES.map(s => s.name), // from local data file
    places:  DEFAULT_PLACES,
    topics:  DEFAULT_TOPICS,
  });

  // Extension-sourced suggestions per category (ranked first in dropdown)
  const [extensionOptions, setExtensionOptions] = useState<Record<Category, string[]>>({
    authors: [],
    sources: [],
    places:  [],
    topics:  [],
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [confirmingRemove, setConfirmingRemove] = useState<{ category: Category; tag: string } | null>(null);
  const [addingTo, setAddingTo] = useState<Category | null>(null);

  // Fetch extension-sourced suggestions from localStorage
  useEffect(() => {
    const fetchExtensionTopics = () => {
      try {
        const stored = localStorage.getItem('thelodown_extension_topics');
        if (!stored) return;

        const data = JSON.parse(stored);
        setExtensionOptions({
          authors: Array.isArray(data.authors) ? data.authors : [],
          sources: Array.isArray(data.sources) ? data.sources : [],
          places:  Array.isArray(data.places) ? data.places : [],
          topics:  Array.isArray(data.topics) ? data.topics : [],
        });
      } catch (err) {
        console.error('Failed to parse extension topics from localStorage:', err);
      }
    };

    // Fetch on mount and listen for storage changes
    fetchExtensionTopics();
    window.addEventListener('storage', fetchExtensionTopics);
    
    // Also check periodically in case another tab updates it
    const interval = setInterval(fetchExtensionTopics, 1000);

    return () => {
      window.removeEventListener('storage', fetchExtensionTopics);
      clearInterval(interval);
    };
  }, []);

  // Load following tags from DB
  useEffect(() => {
    if (!user) return;
    supabase
      .from('following_tags')
      .select('category, tag')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const grouped: Record<Category, string[]> = { authors: [], sources: [], places: [], topics: [] };
        data.forEach(row => { if (row.category in grouped) grouped[row.category as Category].push(row.tag); });
        setFollowing(grouped);
      });
  }, [user]);

  // Load articles from articles table
  useEffect(() => {
    supabase
      .from('articles')
      .select('id, source_id, headline, excerpt, author, url, published_at, tags')
      .order('published_at', { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (data) {
          setRawArticles(data.map(a => ({ ...a, tags: a.tags || [] })));

          const authors = [...new Set(
            data.map(a => a.author).filter(Boolean)
          )].sort() as string[];

          const allTags = [...new Set(
            data.flatMap(a => a.tags || [])
          )].sort() as string[];

          setSearchOptions(prev => ({
            ...prev,
            authors: [...new Set([...prev.authors, ...authors])].sort(),
            topics: [...new Set([...prev.topics, ...allTags])].sort(),
            places: [...new Set([...prev.places, ...allTags])].sort(),
          }));
        }
        setLoadingArticles(false);
      });
  }, []);

  // Populate search options from the user's extension-tracked article visits
  useEffect(() => {
    if (!user) return;
    supabase
      .from('article_visits')
      .select('author, source, keywords')
      .eq('user_id', user.id)
      .order('visited_at', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        if (!data || data.length === 0) return;

        const authors = [...new Set(
          data.map(r => r.author).filter(Boolean)
        )].sort() as string[];

        const sources = [...new Set(
          data.map(r => r.source).filter(Boolean)
        )].sort() as string[];

        const keywords = [...new Set(
          data.flatMap(r => (r.keywords as string[]) || []).filter(Boolean)
        )].sort();

        setSearchOptions(prev => ({
          authors: [...new Set([...prev.authors, ...authors])].sort(),
          sources: [...new Set([...prev.sources, ...sources])].sort(),
          topics:  [...new Set([...prev.topics,  ...keywords])].sort(),
          places:  [...new Set([...prev.places,  ...keywords])].sort(),
        }));
      });
  }, [user]);

  // Join articles with source display names from local data
  const articles: Article[] = useMemo(() =>
    rawArticles.map(a => ({
      ...a,
      source_name: SOURCES.find(s => s.id === a.source_id)?.name || a.source_id,
    })),
    [rawArticles]
  );

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const confirmRemove = (category: Category, tag: string) => {
    setFollowing(prev => ({ ...prev, [category]: prev[category].filter(t => t !== tag) }));
    setActiveFilters(prev => prev.filter(t => t !== tag));
    setConfirmingRemove(null);
    if (user) supabase.from('following_tags').delete().match({ user_id: user.id, category, tag }).then(() => {});
  };

  const addTag = (category: Category, val: string) => {
    if (!val || following[category].includes(val)) return;
    setFollowing(prev => ({ ...prev, [category]: [...prev[category], val] }));
    if (user) supabase.from('following_tags').insert({ user_id: user.id, category, tag: val }).then(() => {});
    setAddingTo(null);
  };

  // ── Not logged in ─────────────────────────────────────────────
  if (!user) {
    return (
      <div className="p-4 lg:p-8">
        <div className="mb-6">
          <h2 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[24px] lg:text-[30px] text-[#3e3232] tracking-[4px] uppercase">
            WHAT YOU'RE FOLLOWING
          </h2>
          <div className="h-1.5 border-t-4 border-b-2 border-[#3e3232] mt-2" />
        </div>

        <div className="border-4 border-[#3e3232]">
          <div className="bg-[#3e3232] px-6 py-4 flex items-center justify-between">
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[3px] text-[#e5d8c8] uppercase">
              Personal Feed — Members Only
            </p>
          </div>
          <div className="divide-y divide-[#3e3232]/15 opacity-30 pointer-events-none select-none">
            {['AUTHORS', 'SOURCES', 'PLACES', 'TOPICS'].map(cat => (
              <div key={cat} className="flex items-center gap-4 px-6 py-4">
                <span className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[11px] tracking-[2px] text-[#3e3232] uppercase w-[72px] flex-shrink-0">
                  {cat}
                </span>
                <div className="flex gap-2">
                  {[20, 32, 24].map((w, i) => (
                    <div key={i} className="h-7 border border-[#3e3232] rounded-sm" style={{ width: w * 4 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-10 text-center border-t-2 border-dashed border-[#3e3232]">
            <p className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[20px] lg:text-[26px] tracking-[3px] text-[#3e3232] uppercase mb-3">
              Build Your News Feed
            </p>
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-70 max-w-sm mx-auto mb-6">
              Follow authors, sources, places, and topics to get a personalized Pittsburgh news feed tailored to you.
            </p>
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[2px] text-[#3e3232] uppercase opacity-50">
              Sign in from the top right corner to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Filter logic ──────────────────────────────────────────────
  const allFollowedTags = [
    ...following.authors,
    ...following.sources,
    ...following.places,
    ...following.topics,
  ];

  const filtersToApply = activeFilters.length > 0
    ? activeFilters
    : allFollowedTags.length > 0
      ? allFollowedTags
      : null;

  const filteredArticles = filtersToApply === null
    ? articles
    : articles.filter(a =>
        filtersToApply.some(f => {
          const fl = f.toLowerCase();
          return (
            a.author.toLowerCase().includes(fl) ||
            a.source_name.toLowerCase().includes(fl) ||
            a.tags.some(t => t.toLowerCase().includes(fl))
          );
        })
      );

  // ── Browse By columns ─────────────────────────────────────────
  const topStories = articles.slice(0, 5);

  const authorCounts: Record<string, { source: string; count: number }> = {};
  articles.forEach(a => {
    if (!a.author) return;
    if (!authorCounts[a.author]) authorCounts[a.author] = { source: a.source_name, count: 0 };
    authorCounts[a.author].count++;
  });
  const topAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  const sourceCounts: Record<string, { nonprofit: boolean; count: number }> = {};
  articles.forEach(a => {
    if (!sourceCounts[a.source_name]) {
      const src = SOURCES.find(s => s.id === a.source_id);
      sourceCounts[a.source_name] = { nonprofit: src?.nonprofit ?? false, count: 0 };
    }
    sourceCounts[a.source_name].count++;
  });
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  return (
    <div className="p-4 lg:p-8 space-y-10">

      {/* ── Section 1: What you're following ────────────────────────── */}
      <section>
        <SectionHeader>WHAT YOU'RE FOLLOWING</SectionHeader>
        <p className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-70 mb-4">
          Click a tag to filter your feed. × to unfollow.
        </p>

        <div className="border-4 border-[#3e3232]">
          {CATEGORIES.map(({ key, label }, i) => (
            <div
              key={key}
              className={`flex items-start gap-4 px-6 py-4 ${i < CATEGORIES.length - 1 ? 'border-b-2 border-dashed border-[#3e3232]' : ''}`}
            >
              <span className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[12px] tracking-[2px] text-[#3e3232] uppercase w-[72px] pt-1.5 flex-shrink-0">
                {label}
              </span>

              <div className="flex flex-wrap gap-2 flex-1 items-start">
                {following[key].map(tag => {
                  const isActive   = activeFilters.includes(tag);
                  const confirming = confirmingRemove?.category === key && confirmingRemove?.tag === tag;

                  if (confirming) {
                    return (
                      <span key={tag} className="flex items-center gap-2 border border-[#3e3232] px-2.5 py-1 bg-[#e5d8c8]">
                        <span className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232]">
                          unfollow "{tag}"?
                        </span>
                        <button onClick={() => confirmRemove(key, tag)} className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] underline hover:no-underline uppercase">yes</button>
                        <button onClick={() => setConfirmingRemove(null)} className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] underline hover:no-underline uppercase">no</button>
                      </span>
                    );
                  }

                  return (
                    <span
                      key={tag}
                      className={`flex items-center gap-1.5 border border-[#3e3232] px-2.5 py-1 transition-colors ${
                        isActive ? 'bg-[#3e3232]' : 'bg-[#e5d8c8] hover:bg-[rgba(62,50,50,0.08)]'
                      }`}
                    >
                      <button
                        onClick={() => toggleFilter(tag)}
                        className={`font-['Didot:Regular',sans-serif] text-[14px] leading-none ${isActive ? 'text-[#e5d8c8]' : 'text-[#3e3232]'}`}
                      >
                        {tag}
                      </button>
                      <button
                        onClick={() => setConfirmingRemove({ category: key, tag })}
                        aria-label={`Unfollow ${tag}`}
                        className={`leading-none text-[15px] hover:opacity-50 ${isActive ? 'text-[#e5d8c8]' : 'text-[#3e3232]'}`}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}

                {/* Search dropdown or trigger button */}
                {addingTo === key ? (
                  <SearchDropdown
                    options={searchOptions[key]}
                    already={following[key]}
                    placeholder={`Search ${label.toLowerCase()}...`}
                    onSelect={val => addTag(key, val)}
                    onClose={() => setAddingTo(null)}
                    extensionSourcedOptions={extensionOptions[key]}
                  />
                ) : (
                  <button
                    onClick={() => setAddingTo(key)}
                    className="border border-dashed border-[#3e3232] px-2.5 py-1 font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] hover:bg-[rgba(62,50,50,0.08)] transition-colors"
                  >
                    + follow more
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          {activeFilters.length > 0 ? (
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[1.5px] text-[#3e3232] uppercase">
              Filtering by: {activeFilters.join(', ')} —{' '}
              <button onClick={() => setActiveFilters([])} className="underline hover:no-underline">clear all</button>
            </p>
          ) : allFollowedTags.length === 0 ? (
            <p className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-60">
              Showing all recent Pittsburgh news. Follow authors, sources, or topics above to personalize your feed.
            </p>
          ) : (
            <p className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-60">
              Showing all stories from everything you follow.
            </p>
          )}
        </div>
      </section>

      {/* ── Section 2: Your Feed ─────────────────────────────────────── */}
      <section>
        <SectionHeader>YOUR FEED</SectionHeader>

        {loadingArticles ? (
          <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60">Loading articles...</p>
        ) : filteredArticles.length === 0 ? (
          <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60">No stories match your current filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map(article => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-4 border-[#3e3232] p-5 text-left hover:bg-[rgba(62,50,50,0.05)] transition-colors block"
              >
                <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[2px] text-[#3e3232] uppercase mb-2">
                  {article.source_name}
                </p>
                <h3 className="font-['Didot:Regular',sans-serif] text-[19px] lg:text-[22px] text-[#3e3232] leading-snug mb-3">
                  {article.headline}
                </h3>
                {article.excerpt && (
                  <p className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-70 leading-snug mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
                <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1.5px] text-[#3e3232] uppercase">
                  {article.author ? `BY ${article.author.toUpperCase()} · ` : ''}{formatDate(article.published_at)}
                </p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 3: Browse By ─────────────────────────────────────── */}
      <section>
        <SectionHeader>BROWSE BY</SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 border-4 border-[#3e3232]">

          <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#3e3232]">
            <div className="border-b-4 border-[#3e3232] px-5 py-3">
              <h3 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232] tracking-[3px] uppercase">STORIES</h3>
            </div>
            <div>
              {topStories.map((article, i) => (
                <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer"
                  className={`w-full text-left px-5 py-4 hover:bg-[rgba(62,50,50,0.07)] transition-colors block ${i < topStories.length - 1 ? 'border-b-2 border-dashed border-[#3e3232]' : ''}`}>
                  <p className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[18px] text-[#3e3232] leading-snug mb-1">{article.headline}</p>
                  <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1.5px] text-[#3e3232] uppercase opacity-80">
                    {article.author ? `BY ${article.author.toUpperCase()} · ` : ''}{article.source_name.toUpperCase()}
                  </p>
                </a>
              ))}
              {topStories.length === 0 && !loadingArticles && (
                <p className="px-5 py-4 font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-60">No articles yet.</p>
              )}
            </div>
          </div>

          <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#3e3232]">
            <div className="border-b-4 border-[#3e3232] px-5 py-3">
              <h3 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232] tracking-[3px] uppercase">AUTHORS</h3>
            </div>
            <div>
              {topAuthors.map(([name, info], i) => (
                <button key={name}
                  onClick={() => addTag('authors', name)}
                  className={`w-full text-left px-5 py-4 hover:bg-[rgba(62,50,50,0.07)] transition-colors ${i < topAuthors.length - 1 ? 'border-b-2 border-dashed border-[#3e3232]' : ''}`}>
                  <p className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[18px] text-[#3e3232] leading-snug mb-1">{name}</p>
                  <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1.5px] text-[#3e3232] uppercase opacity-80">
                    {info.source.toUpperCase()} · {info.count} {info.count === 1 ? 'ARTICLE' : 'ARTICLES'}
                    {following.authors.includes(name) && ' · FOLLOWING'}
                  </p>
                </button>
              ))}
              {topAuthors.length === 0 && !loadingArticles && (
                <p className="px-5 py-4 font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-60">No authors yet.</p>
              )}
            </div>
          </div>

          <div>
            <div className="border-b-4 border-[#3e3232] px-5 py-3">
              <h3 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232] tracking-[3px] uppercase">SOURCES</h3>
            </div>
            <div>
              {topSources.map(([name, info], i) => (
                <button key={name}
                  onClick={() => addTag('sources', name)}
                  className={`w-full text-left px-5 py-4 hover:bg-[rgba(62,50,50,0.07)] transition-colors ${i < topSources.length - 1 ? 'border-b-2 border-dashed border-[#3e3232]' : ''}`}>
                  <p className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[18px] text-[#3e3232] leading-snug mb-1">{name}</p>
                  <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1.5px] text-[#3e3232] uppercase opacity-80">
                    {info.count} {info.count === 1 ? 'ARTICLE' : 'ARTICLES'}
                    {info.nonprofit && ' · NON-PROFIT'}
                    {following.sources.includes(name) && ' · FOLLOWING'}
                  </p>
                </button>
              ))}
              {topSources.length === 0 && !loadingArticles && (
                <p className="px-5 py-4 font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-60">No sources yet.</p>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

// ── SearchDropdown ────────────────────────────────────────────────────────────

function SearchDropdown({ options, already, placeholder, onSelect, onClose, extensionSourcedOptions = [] }: {
  options: string[];
  already: string[];
  placeholder: string;
  onSelect: (val: string) => void;
  onClose: () => void;
  extensionSourcedOptions?: string[];
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // Rank extension-sourced options first, then regular options
  const allOptions = options.slice();
  const extensionFirst = extensionSourcedOptions
    .filter(o => !already.includes(o))
    .filter(o => !allOptions.includes(o) || true); // Include even if in regular options
  
  const filtered = [
    ...extensionFirst
      .filter(o => !query || o.toLowerCase().includes(query.toLowerCase())),
    ...allOptions
      .filter(o => !already.includes(o))
      .filter(o => !extensionFirst.includes(o))
      .filter(o => !query || o.toLowerCase().includes(query.toLowerCase()))
  ]
    .slice(0, 8);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'Enter' && filtered.length > 0) { onSelect(filtered[0]); }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border border-[#3e3232] bg-[#e5d8c8] px-3 py-1 font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] placeholder:text-[#3e3232]/40 focus:outline-none focus:ring-1 focus:ring-[#3e3232] w-[200px]"
      />

      {/* Dropdown results */}
      {(query.length > 0 || options.length > 0) && (
        <div className="absolute top-full left-0 z-50 w-[280px] border-2 border-t-0 border-[#3e3232] bg-[#e5d8c8] shadow-md max-h-[220px] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-3 font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-60">
              {options.length === 0 ? 'No data loaded yet — sync RSS first' : 'No matches'}
            </p>
          ) : (
            <>
              {/* Extension-sourced section (show if present) */}
              {extensionSourcedOptions.length > 0 && (
                <>
                  {extensionSourcedOptions
                    .filter(o => !already.includes(o))
                    .filter(o => !query || o.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 8)
                    .map((option, idx) => (
                      <button
                        key={`ext-${option}`}
                        onMouseDown={e => { e.preventDefault(); onSelect(option); }}
                        className="w-full text-left px-4 py-2.5 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] hover:bg-[rgba(62,50,50,0.15)] bg-[rgba(62,50,50,0.05)] border-b border-[#3e3232]/10 transition-colors group"
                      >
                        <span className="text-[12px] font-['Heading_Now_Trial:25_Medium',sans-serif] tracking-[1px] uppercase text-[#3e3232]/60">♦ </span>
                        {option}
                      </button>
                    ))}
                  {/* Divider between extension and regular options */}
                  {extensionSourcedOptions.filter(o => !already.includes(o)).length > 0 && options.filter(o => !already.includes(o) && !extensionSourcedOptions.includes(o)).length > 0 && (
                    <div className="h-[1px] bg-[#3e3232]/20" />
                  )}
                </>
              )}
              {/* Regular options */}
              {options
                .filter(o => !already.includes(o))
                .filter(o => !extensionSourcedOptions.includes(o))
                .filter(o => !query || o.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 8 - Math.min(8, extensionSourcedOptions.filter(o => !already.includes(o)).length))
                .map(option => (
                  <button
                    key={option}
                    onMouseDown={e => { e.preventDefault(); onSelect(option); }}
                    className="w-full text-left px-4 py-2.5 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] hover:bg-[rgba(62,50,50,0.1)] border-b border-[#3e3232]/10 last:border-b-0 transition-colors"
                  >
                    {option}
                  </button>
                ))
              }
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { return ''; }
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="h-[5px] bg-[#3e3232]" />
      <div className="h-[1.5px] bg-[#3e3232] mt-[3px]" />
      <h2 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[24px] lg:text-[30px] text-[#3e3232] tracking-[4px] uppercase py-2">
        {children}
      </h2>
      <div className="h-[1.5px] bg-[#3e3232]" />
    </div>
  );
}
