// SavedScreen.tsx — user's personal article folders
//
// Logged out → prompt to sign in
// Logged in  → load folders from Supabase, full CRUD
//   - click a folder → see its articles
//   - + new folder button → inline name input
//   - rename: click folder name when inside it
//   - delete: trash button with inline confirmation

import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import imgForward    from "../../imports/Saved/5ac92fce151350446c5cb8d1bef32250c2fc1a87.png";
import imgFolderIcon from "../../imports/Saved-1/e6510d43cdc55b79401dceb4fd4bebd0cc357200.png";

interface Folder {
  id: string;
  name: string;
  article_count?: number;
}

interface Article {
  id: string;
  headline: string;
  source: string | null;
  author: string | null;
  url: string | null;
}

interface ExtBookmark {
  id: string;
  headline: string;
  source: string | null;
  author: string | null;
  url: string;
  saved_at: string;
}

interface Props { user: User | null; }

export default function SavedScreen({ user }: Props) {
  const [folders, setFolders]             = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [articles, setArticles]           = useState<Article[]>([]);
  const [loading, setLoading]             = useState(false);
  const [dbError, setDbError]             = useState<string | null>(null);

  // Extension bookmarks
  const [extBookmarks, setExtBookmarks]   = useState<ExtBookmark[]>([]);
  const [extView, setExtView]             = useState(false);

  // Folder creation
  const [addingFolder, setAddingFolder]   = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const creatingRef = useRef(false); // guard against double-fire from onBlur + Enter

  // Rename
  const [renamingId, setRenamingId]       = useState<string | null>(null);
  const [renameValue, setRenameValue]     = useState('');

  // Delete confirmation
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Load folders and extension bookmarks when user is available
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setDbError(null);
    supabase
      .from('saved_folders')
      .select('id, name')
      .eq('user_id', user.id)
      .order('created_at')
      .then(({ data, error }) => {
        if (error) {
          setDbError(error.message);
        } else if (data) {
          setFolders(data.map(f => ({ id: f.id, name: f.name, article_count: 0 })));
        }
        setLoading(false);
      });

    supabase
      .from('extension_bookmarks')
      .select('id, headline, source, author, url, saved_at')
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false })
      .limit(100)
      .then(({ data }) => { if (data) setExtBookmarks(data as ExtBookmark[]); });
  }, [user]);

  // Load articles when a folder is selected
  useEffect(() => {
    if (!selectedFolder || !user) return;
    supabase
      .from('saved_articles')
      .select('id, headline, source, author, url')
      .eq('folder_id', selectedFolder.id)
      .order('saved_at', { ascending: false })
      .then(({ data }) => { if (data) setArticles(data); });
  }, [selectedFolder, user]);

  const createFolder = async () => {
    if (creatingRef.current) return;
    const name = newFolderName.trim();
    if (!name || !user) { setAddingFolder(false); return; }

    creatingRef.current = true;

    // Show the folder immediately — don't wait for the DB round-trip
    const tempId = `temp-${Date.now()}`;
    setFolders(prev => [...prev, { id: tempId, name, article_count: 0 }]);
    setNewFolderName('');
    setAddingFolder(false);

    const { data, error } = await supabase
      .from('saved_folders')
      .insert({ user_id: user.id, name })
      .select('id, name')
      .single();

    if (error || !data) {
      setFolders(prev => prev.filter(f => f.id !== tempId));
      setDbError(error?.message ?? 'Could not save folder. Make sure the database table exists.');
    } else {
      // Swap the temp ID for the real one from the DB
      setFolders(prev => prev.map(f => f.id === tempId ? { ...data, article_count: 0 } : f));
    }

    creatingRef.current = false;
  };

  const renameFolder = async (id: string) => {
    const name = renameValue.trim();
    if (!name) { setRenamingId(null); return; }
    await supabase.from('saved_folders').update({ name }).eq('id', id);
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f));
    if (selectedFolder?.id === id) setSelectedFolder(prev => prev ? { ...prev, name } : prev);
    setRenamingId(null);
  };

  const deleteFolder = async (id: string) => {
    await supabase.from('saved_folders').delete().eq('id', id);
    setFolders(prev => prev.filter(f => f.id !== id));
    if (selectedFolder?.id === id) setSelectedFolder(null);
    setConfirmDelete(null);
  };

  // ── Not logged in ───────────────────────────────────────────────
  if (!user) {
    return (
      <div className="p-4 lg:p-8">
        {/* Preview grid — decorative */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0 opacity-20 pointer-events-none select-none">
          {['Reading List', 'Local Politics', 'Environment'].map(name => (
            <div key={name} className="h-[200px] border-4 border-[#3e3232] p-6">
              <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[28px] text-[#3e3232] uppercase mb-3">
                {name}
              </h3>
              <div className="h-[2px] bg-[#3e3232] mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-[#3e3232]/30 rounded w-3/4" />
                <div className="h-3 bg-[#3e3232]/30 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA — overlaid feel */}
        <div className="border-4 border-[#3e3232] -mt-0">
          <div className="bg-[#3e3232] px-6 py-4">
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[3px] text-[#e5d8c8] uppercase">
              Saved Articles — Members Only
            </p>
          </div>
          <div className="px-6 py-10 text-center">
            <img src={imgFolderIcon} alt="" className="size-[52px] object-contain mx-auto mb-5 opacity-50" />
            <p className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[20px] lg:text-[26px] tracking-[3px] text-[#3e3232] uppercase mb-3">
              Organize What You Read
            </p>
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-70 max-w-sm mx-auto mb-6">
              Create folders and save stories from across Pittsburgh's local news landscape — all in one place.
            </p>
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[2px] text-[#3e3232] uppercase opacity-50">
              Sign in from the top right corner to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Extension bookmarks view ────────────────────────────────────
  if (extView) {
    return (
      <div className="p-4 lg:p-8">
        <button
          onClick={() => setExtView(false)}
          className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[20px] lg:text-[28px] text-[#3e3232] tracking-[2.8px] uppercase hover:underline mb-6 block"
        >
          ← BACK TO FOLDERS
        </button>

        <div className="mb-6">
          <div className="h-[5px] bg-[#3e3232]" />
          <div className="h-[1.5px] bg-[#3e3232] mt-[3px]" />
          <h2 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[24px] lg:text-[30px] text-[#3e3232] tracking-[4px] uppercase py-2">
            From Extension
          </h2>
          <div className="h-[1.5px] bg-[#3e3232]" />
        </div>

        <div className="border-4 border-[#3e3232] p-4 lg:p-6">
          {extBookmarks.length === 0 ? (
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60 text-center py-8">
              No bookmarks saved from the extension yet. Use the bookmark button in the extension popup to save articles here.
            </p>
          ) : (
            <div className="space-y-2">
              {extBookmarks.map(bk => (
                <div key={bk.id} className="flex items-center justify-between p-3 border-2 border-[#3e3232] bg-[#e5d8c8]">
                  <div className="flex-1 mr-4">
                    <p className="font-['Didot:Regular',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232]">{bk.headline}</p>
                    <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] uppercase opacity-60 mt-0.5">
                      {[bk.author, bk.source].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <a href={bk.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 hover:opacity-70">
                    <img src={imgForward} alt="Open" className="w-[24px] h-[24px] object-contain" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Folder detail view ──────────────────────────────────────────
  if (selectedFolder) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedFolder(null)}
            className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[20px] lg:text-[28px] text-[#3e3232] tracking-[2.8px] uppercase hover:underline"
          >
            ← BACK TO FOLDERS
          </button>

          {/* Delete folder */}
          {confirmDelete === selectedFolder.id ? (
            <span className="flex items-center gap-3">
              <span className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232]">Delete this folder?</span>
              <button onClick={() => deleteFolder(selectedFolder.id)} className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[12px] tracking-[1px] text-[#3e3232] underline uppercase">yes</button>
              <button onClick={() => setConfirmDelete(null)} className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[12px] tracking-[1px] text-[#3e3232] underline uppercase">no</button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmDelete(selectedFolder.id)}
              className="font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] underline hover:no-underline opacity-60"
            >
              Delete folder
            </button>
          )}
        </div>

        {/* Folder name — click to rename */}
        <div className="flex items-center gap-4 mb-8">
          <img src={imgFolderIcon} alt="" className="size-[50px] lg:size-[70px] object-contain" />
          {renamingId === selectedFolder.id ? (
            <input
              autoFocus
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') renameFolder(selectedFolder.id); if (e.key === 'Escape') setRenamingId(null); }}
              onBlur={() => renameFolder(selectedFolder.id)}
              className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[40px] lg:text-[60px] text-[#3e3232] uppercase bg-transparent border-b-2 border-[#3e3232] outline-none"
            />
          ) : (
            <button
              onClick={() => { setRenamingId(selectedFolder.id); setRenameValue(selectedFolder.name); }}
              className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[40px] lg:text-[60px] text-[#3e3232] uppercase hover:underline text-left"
            >
              {selectedFolder.name}
            </button>
          )}
        </div>

        <div className="border-4 border-[#3e3232] p-4 lg:p-6">
          {articles.length === 0 ? (
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60 text-center py-8">
              No articles saved here yet.
            </p>
          ) : (
            <div className="space-y-2">
              {articles.map(article => (
                <div key={article.id} className="flex items-center justify-between p-3 border-2 border-[#3e3232] bg-[#e5d8c8]">
                  <div>
                    <p className="font-['Didot:Regular',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232]">{article.headline}</p>
                    {article.author && (
                      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[1px] text-[#3e3232] uppercase opacity-70 mt-0.5">
                        {article.author} {article.source ? `· ${article.source}` : ''}
                      </p>
                    )}
                  </div>
                  {article.url && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 ml-4 hover:opacity-70">
                      <img src={imgForward} alt="Open" className="w-[24px] h-[24px] object-contain" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Folder grid view ────────────────────────────────────────────
  return (
    <div className="p-4 lg:p-8">
      {dbError && (
        <div className="mb-6 border-2 border-[#3e3232] bg-[#3e3232]/5 px-5 py-4">
          <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[2px] text-[#3e3232] uppercase mb-1">
            Database error
          </p>
          <p className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-80">
            {dbError}
          </p>
          <p className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-60 mt-2">
            The <code>saved_folders</code> table may not exist yet. Run the setup SQL in your Supabase dashboard to create it.
          </p>
        </div>
      )}
      {loading ? (
        <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Extension bookmarks card */}
          <button
            onClick={() => setExtView(true)}
            className="relative h-[300px] border-4 border-[#3e3232] p-4 lg:p-6 hover:bg-[#d4c5b5] transition-colors group text-left"
          >
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[2px] text-[#3e3232] uppercase opacity-60 mb-2">
              Extension Saves
            </p>
            <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[28px] lg:text-[36px] text-[#3e3232] uppercase mb-4">
              FROM EXTENSION
            </h3>
            <div className="h-[2px] bg-[#3e3232] my-3" />
            <p className="font-['Didot:Italic',sans-serif] italic text-[15px] text-[#3e3232] opacity-70">
              {extBookmarks.length === 0 ? 'No saves yet' : `${extBookmarks.length} article${extBookmarks.length === 1 ? '' : 's'}`}
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <img src={imgForward} alt="" className="w-[32px] h-[32px] object-contain" />
            </div>
          </button>

          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder)}
              className="relative h-[300px] border-4 border-[#3e3232] p-4 lg:p-6 hover:bg-[#d4c5b5] transition-colors group text-left"
            >
              <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[28px] lg:text-[36px] text-[#3e3232] uppercase mb-4">
                {folder.name}
              </h3>
              <div className="h-[2px] bg-[#3e3232] my-3" />
              <p className="font-['Didot:Italic',sans-serif] italic text-[15px] text-[#3e3232] opacity-70">
                {folder.article_count === 0 ? 'No articles yet' : `${folder.article_count} article${folder.article_count === 1 ? '' : 's'}`}
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <img src={imgForward} alt="" className="w-[32px] h-[32px] object-contain" />
              </div>
            </button>
          ))}

          {/* New folder — inline input or + button */}
          {addingFolder ? (
            <div className="h-[300px] border-4 border-dashed border-[#3e3232] p-4 lg:p-6 flex flex-col items-center justify-center gap-4">
              <input
                autoFocus
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') createFolder(); if (e.key === 'Escape') setAddingFolder(false); }}
                onBlur={createFolder}
                placeholder="Folder name..."
                className="w-full border-b-2 border-[#3e3232] bg-transparent font-['Heading_Now_Trial:25_Medium',sans-serif] text-[24px] text-[#3e3232] uppercase text-center outline-none placeholder:opacity-40"
              />
              <p className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-60">Enter to save, Esc to cancel</p>
            </div>
          ) : (
            <button
              onClick={() => setAddingFolder(true)}
              className="h-[300px] border-4 border-dashed border-[#3e3232] p-4 lg:p-6 hover:bg-[#d4c5b5] transition-colors flex flex-col items-center justify-center"
            >
              <img src={imgFolderIcon} alt="" className="size-[60px] object-contain mb-4 opacity-70" />
              <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[28px] lg:text-[36px] text-[#3e3232] uppercase">
                NEW FOLDER +
              </p>
            </button>
          )}

        </div>
      )}
    </div>
  );
}
