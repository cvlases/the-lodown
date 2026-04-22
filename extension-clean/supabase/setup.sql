-- =============================================================================
-- THE LODOWN — Supabase Database Setup
-- =============================================================================
-- Run this entire script in Supabase Dashboard → SQL Editor → New Query
-- It creates all tables, indexes, RLS policies, and seeds initial data.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE throughout).
-- =============================================================================

-- ── 1. SOURCES — local news outlets (used by both website and extension) ─────

CREATE TABLE IF NOT EXISTS sources (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  url        TEXT NOT NULL,
  domain     TEXT,
  city       TEXT NOT NULL DEFAULT 'Pittsburgh',
  state      TEXT NOT NULL DEFAULT 'PA',
  nonprofit  BOOLEAN NOT NULL DEFAULT false,
  verified   BOOLEAN NOT NULL DEFAULT true,
  rss_url    TEXT,
  address    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "sources_read_all" ON sources
  FOR SELECT USING (true);

-- Seed the default Pittsburgh sources
INSERT INTO sources (id, name, url, domain, city, state, nonprofit, verified, address, rss_url) VALUES
  ('publicsource',              'Public Source',              'https://www.publicsource.org/',     'publicsource.org',    'Pittsburgh', 'PA', true,  true, '1936 Fifth Avenue, Pittsburgh, PA 15219',              'https://www.publicsource.org/feed/'),
  ('next-pittsburgh',           'NEXTpittsburgh',            'https://nextpittsburgh.com/',       'nextpittsburgh.com',  'Pittsburgh', 'PA', false, true, '223 Fourth Ave, Pittsburgh, PA 15222',                 'https://nextpittsburgh.com/feed/'),
  ('triblive',                  'TribLIVE',                  'https://triblive.com/',             'triblive.com',        'Pittsburgh', 'PA', false, true, '210 Wood Street, Tarentum, PA 15084',                  'https://triblive.com/feed/'),
  ('wesa',                      '90.5 WESA',                 'https://www.wesa.fm/',              'wesa.fm',             'Pittsburgh', 'PA', true,  true, '67 Bedford Square, Pittsburgh, PA 15203',               'https://www.wesa.fm/rss.xml'),
  ('pittsburgh-union-progress', 'Pittsburgh Union Progress',  'https://www.unionprogress.com/',   'unionprogress.com',   'Pittsburgh', 'PA', true,  true, NULL,                                                   'https://www.unionprogress.com/feed/'),
  ('pittsburgh-post-gazette',   'Pittsburgh Post-Gazette',    'https://www.post-gazette.com/',    'post-gazette.com',    'Pittsburgh', 'PA', false, true, '358 North Shore Drive, Suite 300, Pittsburgh, PA 15212','https://www.post-gazette.com/rss/Headlines-RSS')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, url = EXCLUDED.url, domain = EXCLUDED.domain,
  rss_url = EXCLUDED.rss_url, address = EXCLUDED.address;


-- ── 2. ARTICLES — fetched via RSS sync edge function ─────────────────────────

CREATE TABLE IF NOT EXISTS articles (
  id           TEXT PRIMARY KEY,
  source_id    TEXT NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  headline     TEXT NOT NULL,
  excerpt      TEXT,
  author       TEXT,
  url          TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  tags         TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_source   ON articles(source_id);
CREATE INDEX IF NOT EXISTS idx_articles_pub_date ON articles(published_at DESC);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "articles_read_all" ON articles
  FOR SELECT USING (true);

-- The sync-rss edge function uses the service role key, which bypasses RLS.
-- No INSERT policy needed for the function; this policy allows it explicitly if needed.
CREATE POLICY IF NOT EXISTS "articles_insert_service" ON articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "articles_update_service" ON articles
  FOR UPDATE USING (true);


-- ── 3. SAVED_FOLDERS — user bookmark folders (website) ───────────────────────

CREATE TABLE IF NOT EXISTS saved_folders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_folders_user ON saved_folders(user_id);

ALTER TABLE saved_folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "folders_own_select" ON saved_folders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "folders_own_insert" ON saved_folders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "folders_own_update" ON saved_folders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "folders_own_delete" ON saved_folders
  FOR DELETE USING (auth.uid() = user_id);


-- ── 4. SAVED_ARTICLES — articles inside folders ──────────────────────────────

CREATE TABLE IF NOT EXISTS saved_articles (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id UUID NOT NULL REFERENCES saved_folders(id) ON DELETE CASCADE,
  headline  TEXT NOT NULL,
  source    TEXT,
  author    TEXT,
  url       TEXT,
  saved_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saved_articles_folder ON saved_articles(folder_id);

ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "saved_articles_own_select" ON saved_articles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM saved_folders WHERE saved_folders.id = saved_articles.folder_id AND saved_folders.user_id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "saved_articles_own_insert" ON saved_articles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM saved_folders WHERE saved_folders.id = saved_articles.folder_id AND saved_folders.user_id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "saved_articles_own_delete" ON saved_articles
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM saved_folders WHERE saved_folders.id = saved_articles.folder_id AND saved_folders.user_id = auth.uid())
  );


-- ── 5. FOLLOWING_TAGS — personalized feed tags (website) ─────────────────────

CREATE TABLE IF NOT EXISTS following_tags (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('authors', 'sources', 'places', 'topics')),
  tag      TEXT NOT NULL,
  UNIQUE(user_id, category, tag)
);

CREATE INDEX IF NOT EXISTS idx_following_tags_user ON following_tags(user_id);

ALTER TABLE following_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "tags_own_select" ON following_tags
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "tags_own_insert" ON following_tags
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "tags_own_delete" ON following_tags
  FOR DELETE USING (auth.uid() = user_id);


-- ── 6. SOURCE_REQUESTS — outlet submission form (website) ────────────────────

CREATE TABLE IF NOT EXISTS source_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_name   TEXT NOT NULL,
  outlet_url    TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  city          TEXT,
  state         TEXT,
  description   TEXT,
  status        TEXT NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE source_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (even anonymous) can submit a source request
CREATE POLICY IF NOT EXISTS "source_requests_insert_anon" ON source_requests
  FOR INSERT WITH CHECK (true);


-- ── 7. RESISTANCE_LIST — corporate media flagging (extension) ────────────────

CREATE TABLE IF NOT EXISTS resistance_list (
  id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL UNIQUE,
  owner  TEXT NOT NULL,
  type   TEXT NOT NULL DEFAULT 'corporate'
);

ALTER TABLE resistance_list ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "resistance_read_all" ON resistance_list
  FOR SELECT USING (true);

-- Seed some example corporate media entries
INSERT INTO resistance_list (domain, owner, type) VALUES
  ('cnn.com',              'Warner Bros. Discovery',   'corporate'),
  ('foxnews.com',          'Fox Corporation',          'corporate'),
  ('msnbc.com',            'Comcast / NBCUniversal',   'corporate'),
  ('nytimes.com',          'The New York Times Co.',    'corporate'),
  ('washingtonpost.com',   'Jeff Bezos',               'billionaire-owned'),
  ('wsj.com',              'News Corp / Rupert Murdoch','corporate'),
  ('abcnews.go.com',       'The Walt Disney Company',  'corporate'),
  ('cbsnews.com',          'Paramount Global',         'corporate'),
  ('nbcnews.com',          'Comcast / NBCUniversal',   'corporate'),
  ('usatoday.com',         'Gannett',                  'corporate')
ON CONFLICT (domain) DO NOTHING;


-- ── 8. EXTENSION_BOOKMARKS — articles saved from the extension ───────────────

CREATE TABLE IF NOT EXISTS extension_bookmarks (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  headline TEXT NOT NULL,
  source   TEXT,
  author   TEXT,
  url      TEXT,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, url)
);

CREATE INDEX IF NOT EXISTS idx_ext_bookmarks_user ON extension_bookmarks(user_id);

ALTER TABLE extension_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "ext_bookmarks_own_select" ON extension_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "ext_bookmarks_own_insert" ON extension_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "ext_bookmarks_own_delete" ON extension_bookmarks
  FOR DELETE USING (auth.uid() = user_id);


-- =============================================================================
-- Done! All tables, indexes, RLS policies, and seed data are in place.
-- =============================================================================
