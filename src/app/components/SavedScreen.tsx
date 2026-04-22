import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import imgForward from "../../imports/Saved/5ac92fce151350446c5cb8d1bef32250c2fc1a87.png";
import imgFolderIcon from "../../imports/Saved-1/e6510d43cdc55b79401dceb4fd4bebd0cc357200.png";

interface Folder {
  id: string;
  name: string;
  article_count: number;
}

interface BaseArticle {
  id: string;
  headline: string;
  source: string | null;
  author: string | null;
  url: string | null;
  saved_at: string;
}

interface InboxArticle extends BaseArticle {}

interface FolderArticle extends BaseArticle {
  folder_id: string;
}

interface Props {
  user: User | null;
}

export default function SavedScreen({ user }: Props) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [folderArticles, setFolderArticles] = useState<FolderArticle[]>([]);
  const [inboxArticles, setInboxArticles] = useState<InboxArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [showInbox, setShowInbox] = useState(false);

  const [addingFolder, setAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const creatingRef = useRef(false);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const [confirmDeleteFolder, setConfirmDeleteFolder] = useState<string | null>(null);

  const loadLibrary = async (userId: string) => {
    setLoading(true);
    setDbError(null);

    const [{ data: folderRows, error: folderError }, { data: inboxRows }, { data: groupedRows }] = await Promise.all([
      supabase
        .from('saved_folders')
        .select('id, name')
        .eq('user_id', userId)
        .order('created_at'),
      supabase
        .from('extension_bookmarks')
        .select('id, headline, source, author, url, saved_at')
        .eq('user_id', userId)
        .order('saved_at', { ascending: false })
        .limit(200),
      supabase
        .from('saved_articles')
        .select('id, folder_id')
        .order('saved_at', { ascending: false }),
    ]);

    if (folderError) {
      setDbError(folderError.message);
      setLoading(false);
      return;
    }

    const counts: Record<string, number> = {};
    (groupedRows || []).forEach(row => {
      counts[row.folder_id] = (counts[row.folder_id] || 0) + 1;
    });

    setFolders((folderRows || []).map(folder => ({
      id: folder.id,
      name: folder.name,
      article_count: counts[folder.id] || 0,
    })));
    setInboxArticles((inboxRows || []) as InboxArticle[]);
    setLoading(false);
  };

  const loadSelectedFolderArticles = async (folderId: string) => {
    const { data } = await supabase
      .from('saved_articles')
      .select('id, folder_id, headline, source, author, url, saved_at')
      .eq('folder_id', folderId)
      .order('saved_at', { ascending: false });

    setFolderArticles((data || []) as FolderArticle[]);
  };

  useEffect(() => {
    if (!user) return;
    void loadLibrary(user.id);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const refresh = () => {
      if (document.visibilityState === 'hidden') return;
      void loadLibrary(user.id);
      if (selectedFolder) void loadSelectedFolderArticles(selectedFolder.id);
    };

    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);

    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [user, selectedFolder]);

  useEffect(() => {
    if (!selectedFolder || !user) return;
    void loadSelectedFolderArticles(selectedFolder.id);
  }, [selectedFolder, user]);

  const createFolder = async () => {
    if (creatingRef.current) return;
    const name = newFolderName.trim();
    if (!name || !user) {
      setAddingFolder(false);
      return;
    }

    creatingRef.current = true;
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
      setFolders(prev => prev.filter(folder => folder.id !== tempId));
      setDbError(error?.message ?? 'Could not save folder.');
    } else {
      setFolders(prev => prev.map(folder =>
        folder.id === tempId ? { id: data.id, name: data.name, article_count: 0 } : folder
      ));
    }

    creatingRef.current = false;
  };

  const renameFolder = async (id: string) => {
    const name = renameValue.trim();
    if (!name) {
      setRenamingId(null);
      return;
    }

    await supabase.from('saved_folders').update({ name }).eq('id', id);
    setFolders(prev => prev.map(folder => folder.id === id ? { ...folder, name } : folder));
    if (selectedFolder?.id === id) {
      setSelectedFolder(prev => prev ? { ...prev, name } : prev);
    }
    setRenamingId(null);
  };

  const deleteFolder = async (id: string) => {
    await supabase.from('saved_folders').delete().eq('id', id);
    setFolders(prev => prev.filter(folder => folder.id !== id));
    if (selectedFolder?.id === id) setSelectedFolder(null);
    setConfirmDeleteFolder(null);
  };

  const adjustFolderCount = (folderId: string, delta: number) => {
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? { ...folder, article_count: Math.max(0, folder.article_count + delta) }
        : folder
    ));
    if (selectedFolder?.id === folderId) {
      setSelectedFolder(prev => prev ? { ...prev, article_count: Math.max(0, prev.article_count + delta) } : prev);
    }
  };

  const moveInboxArticleToFolder = async (article: InboxArticle, folderId: string) => {
    const { error: insertError } = await supabase
      .from('saved_articles')
      .insert({
        folder_id: folderId,
        headline: article.headline,
        source: article.source,
        author: article.author,
        url: article.url,
      });

    if (insertError) {
      setDbError(insertError.message);
      return;
    }

    await supabase.from('extension_bookmarks').delete().eq('id', article.id);
    setInboxArticles(prev => prev.filter(item => item.id !== article.id));
    adjustFolderCount(folderId, 1);

    if (selectedFolder?.id === folderId) {
      void loadSelectedFolderArticles(folderId);
    }
  };

  const moveFolderArticleToFolder = async (article: FolderArticle, targetFolderId: string) => {
    if (article.folder_id === targetFolderId) return;

    const { error: insertError } = await supabase
      .from('saved_articles')
      .insert({
        folder_id: targetFolderId,
        headline: article.headline,
        source: article.source,
        author: article.author,
        url: article.url,
      });

    if (insertError) {
      setDbError(insertError.message);
      return;
    }

    await supabase.from('saved_articles').delete().eq('id', article.id);
    setFolderArticles(prev => prev.filter(item => item.id !== article.id));
    adjustFolderCount(article.folder_id, -1);
    adjustFolderCount(targetFolderId, 1);

    if (selectedFolder?.id === targetFolderId) {
      void loadSelectedFolderArticles(targetFolderId);
    }
  };

  const moveFolderArticleToInbox = async (article: FolderArticle) => {
    if (!user) return;

    const { error: insertError } = await supabase
      .from('extension_bookmarks')
      .upsert({
        user_id: user.id,
        headline: article.headline,
        source: article.source,
        author: article.author,
        url: article.url,
      }, { onConflict: 'user_id,url' });

    if (insertError) {
      setDbError(insertError.message);
      return;
    }

    await supabase.from('saved_articles').delete().eq('id', article.id);
    setFolderArticles(prev => prev.filter(item => item.id !== article.id));
    adjustFolderCount(article.folder_id, -1);
    void loadLibrary(user.id);
  };

  const deleteInboxArticle = async (articleId: string) => {
    await supabase.from('extension_bookmarks').delete().eq('id', articleId);
    setInboxArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const deleteFolderArticle = async (article: FolderArticle) => {
    await supabase.from('saved_articles').delete().eq('id', article.id);
    setFolderArticles(prev => prev.filter(item => item.id !== article.id));
    adjustFolderCount(article.folder_id, -1);
  };

  if (!user) {
    return (
      <div className="p-4 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0 opacity-20 pointer-events-none select-none">
          {['Saved Articles', 'Reading List', 'Environment'].map(name => (
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

        <div className="border-4 border-[#3e3232]">
          <div className="bg-[#3e3232] px-6 py-4">
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[3px] text-[#e5d8c8] uppercase">
              Saved Articles — Members Only
            </p>
          </div>
          <div className="px-6 py-10 text-center">
            <img src={imgFolderIcon} alt="" className="size-[52px] object-contain mx-auto mb-5 opacity-50" />
            <p className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[20px] lg:text-[26px] tracking-[3px] text-[#3e3232] uppercase mb-3">
              Save First, Organize Later
            </p>
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-70 max-w-sm mx-auto mb-6">
              Every saved article lands in one place first. Then you can move stories into folders, tidy them up, and manage your reading list.
            </p>
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[2px] text-[#3e3232] uppercase opacity-50">
              Sign in from the top right corner to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showInbox) {
    return (
      <div className="p-4 lg:p-8">
        <button
          onClick={() => setShowInbox(false)}
          className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[20px] lg:text-[28px] text-[#3e3232] tracking-[2.8px] uppercase hover:underline mb-6 block"
        >
          ← BACK TO LIBRARY
        </button>

        <SectionTitle title="Saved Articles" subtitle="Unfiled stories you can organize into folders whenever you're ready." />

        <div className="border-4 border-[#3e3232] p-4 lg:p-6">
          {inboxArticles.length === 0 ? (
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60 text-center py-8">
              No saved articles yet. Use the bookmark button in the extension popup to save articles here.
            </p>
          ) : (
            <div className="space-y-3">
              {inboxArticles.map(article => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  folders={folders}
                  moveLabel="Move to folder"
                  onMove={folderId => void moveInboxArticleToFolder(article, folderId)}
                  onDelete={() => void deleteInboxArticle(article.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedFolder) {
    return (
      <div className="p-4 lg:p-8">
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setSelectedFolder(null)}
            className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[20px] lg:text-[28px] text-[#3e3232] tracking-[2.8px] uppercase hover:underline"
          >
            ← BACK TO LIBRARY
          </button>

          {confirmDeleteFolder === selectedFolder.id ? (
            <span className="flex items-center gap-3">
              <span className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232]">Delete this folder?</span>
              <button onClick={() => void deleteFolder(selectedFolder.id)} className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[12px] tracking-[1px] text-[#3e3232] underline uppercase">yes</button>
              <button onClick={() => setConfirmDeleteFolder(null)} className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[12px] tracking-[1px] text-[#3e3232] underline uppercase">no</button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmDeleteFolder(selectedFolder.id)}
              className="font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] underline hover:no-underline opacity-60"
            >
              Delete folder
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <img src={imgFolderIcon} alt="" className="size-[50px] lg:size-[70px] object-contain" />
          {renamingId === selectedFolder.id ? (
            <input
              autoFocus
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') void renameFolder(selectedFolder.id);
                if (e.key === 'Escape') setRenamingId(null);
              }}
              onBlur={() => void renameFolder(selectedFolder.id)}
              className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[40px] lg:text-[60px] text-[#3e3232] uppercase bg-transparent border-b-2 border-[#3e3232] outline-none"
            />
          ) : (
            <button
              onClick={() => {
                setRenamingId(selectedFolder.id);
                setRenameValue(selectedFolder.name);
              }}
              className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[40px] lg:text-[60px] text-[#3e3232] uppercase hover:underline text-left"
            >
              {selectedFolder.name}
            </button>
          )}
        </div>

        <div className="border-4 border-[#3e3232] p-4 lg:p-6">
          {folderArticles.length === 0 ? (
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-60 text-center py-8">
              No articles in this folder yet.
            </p>
          ) : (
            <div className="space-y-3">
              {folderArticles.map(article => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  folders={folders.filter(folder => folder.id !== article.folder_id)}
                  moveLabel="Move to folder"
                  onMove={folderId => void moveFolderArticleToFolder(article, folderId)}
                  onSendToInbox={() => void moveFolderArticleToInbox(article)}
                  onDelete={() => void deleteFolderArticle(article)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

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
          <button
            onClick={() => setShowInbox(true)}
            className="relative h-[300px] border-4 border-[#3e3232] p-4 lg:p-6 hover:bg-[#d4c5b5] transition-colors group text-left"
          >
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[2px] text-[#3e3232] uppercase opacity-60 mb-2">
              Your Inbox
            </p>
            <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[28px] lg:text-[36px] text-[#3e3232] uppercase mb-4">
              SAVED ARTICLES
            </h3>
            <div className="h-[2px] bg-[#3e3232] my-3" />
            <p className="font-['Didot:Italic',sans-serif] italic text-[15px] text-[#3e3232] opacity-70">
              {inboxArticles.length === 0 ? 'No saved articles yet' : `${inboxArticles.length} unfiled article${inboxArticles.length === 1 ? '' : 's'}`}
            </p>
            <p className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-60 mt-3">
              Save first, then group stories into folders whenever you want.
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
              <p className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-60 mt-3">
                Organize, move, and revisit stories by theme or project.
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <img src={imgForward} alt="" className="w-[32px] h-[32px] object-contain" />
              </div>
            </button>
          ))}

          {addingFolder ? (
            <div className="h-[300px] border-4 border-dashed border-[#3e3232] p-4 lg:p-6 flex flex-col items-center justify-center gap-4">
              <input
                autoFocus
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') void createFolder();
                  if (e.key === 'Escape') setAddingFolder(false);
                }}
                onBlur={() => void createFolder()}
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

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="h-[5px] bg-[#3e3232]" />
      <div className="h-[1.5px] bg-[#3e3232] mt-[3px]" />
      <h2 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[24px] lg:text-[30px] text-[#3e3232] tracking-[4px] uppercase py-2">
        {title}
      </h2>
      <div className="h-[1.5px] bg-[#3e3232]" />
      <p className="font-['Didot:Italic',sans-serif] italic text-[15px] text-[#3e3232] opacity-70 mt-3">
        {subtitle}
      </p>
    </div>
  );
}

function ArticleRow({
  article,
  folders,
  moveLabel,
  onMove,
  onSendToInbox,
  onDelete,
}: {
  article: BaseArticle;
  folders: Folder[];
  moveLabel: string;
  onMove: (folderId: string) => void;
  onSendToInbox?: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="border-2 border-[#3e3232] bg-[#e5d8c8] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-['Didot:Regular',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232]">{article.headline}</p>
          <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] uppercase opacity-60 mt-1">
            {[article.author, article.source].filter(Boolean).join(' · ') || 'Saved article'}
          </p>
        </div>
        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 hover:opacity-70">
            <img src={imgForward} alt="Open" className="w-[24px] h-[24px] object-contain" />
          </a>
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mt-4">
        <select
          defaultValue=""
          onChange={e => {
            if (e.target.value) {
              onMove(e.target.value);
              e.currentTarget.value = '';
            }
          }}
          className="border-2 border-[#3e3232] bg-[#e5d8c8] px-3 py-2 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] uppercase"
        >
          <option value="">{moveLabel}</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>

        {onSendToInbox && (
          <button
            onClick={onSendToInbox}
            className="border-2 border-[#3e3232] px-3 py-2 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] uppercase hover:bg-[#d4c5b5] transition-colors"
          >
            Move to saved articles
          </button>
        )}

        <button
          onClick={onDelete}
          className="border-2 border-[#3e3232] px-3 py-2 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[1px] text-[#3e3232] uppercase hover:bg-[#d4c5b5] transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
