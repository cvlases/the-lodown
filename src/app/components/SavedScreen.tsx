import { useState } from 'react';
import imgForward from "../../imports/Saved/5ac92fce151350446c5cb8d1bef32250c2fc1a87.png";
import imgFolderIcon from "../../imports/Saved-1/e6510d43cdc55b79401dceb4fd4bebd0cc357200.png";

interface Folder {
  id: string;
  name: string;
  articles: string[];
}

const INITIAL_FOLDERS: Folder[] = [
  { id: '1', name: 'FOLDER ONE', articles: ['Saved Article One', 'Saved Article Two', 'Saved Article Three'] },
  { id: '2', name: 'FOLDER TWO', articles: ['Saved Article One', 'Saved Article Two', 'Saved Article Three'] },
  { id: '3', name: 'FOLDER THREE', articles: ['Saved Article One', 'Saved Article Two', 'Saved Article Three'] },
  { id: '4', name: 'FOLDER FOUR', articles: ['Saved Article One', 'Saved Article Two', 'Saved Article Three'] },
  { id: '5', name: 'FOLDER FIVE', articles: ['Saved Article One', 'Saved Article Two', 'Saved Article Three'] },
];

export default function SavedScreen() {
  const [folders] = useState<Folder[]>(INITIAL_FOLDERS);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  if (selectedFolder) {
    const folder = folders.find(f => f.id === selectedFolder);
    if (!folder) return null;

    return (
      <div className="p-4 lg:p-8">
        <button
          onClick={() => setSelectedFolder(null)}
          className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[20px] lg:text-[28px] text-[#3e3232] tracking-[2.8px] uppercase mb-6 hover:underline"
        >
          ← BACK TO FOLDERS
        </button>

        <div className="flex items-center gap-4 mb-8">
          <img src={imgFolderIcon} alt="" className="size-[50px] lg:size-[70px] object-contain" />
          <h2 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[40px] lg:text-[60px] text-[#3e3232] uppercase">
            {folder.name}
          </h2>
        </div>

        <div className="border-4 border-black p-4 lg:p-6">
          <div className="space-y-2">
            {folder.articles.map((article, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border-2 border-[#3e3232] bg-[#e5d8c8]"
              >
                <p className="font-['Didot:Bold',sans-serif] text-[18px] lg:text-[24px] text-[#3e3232]">
                  {article}
                </p>
                <button className="flex items-center gap-2 hover:opacity-70">
                  <img src={imgForward} alt="" className="w-[24px] h-[24px] object-contain" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder, idx) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className="relative h-[300px] border-4 border-black p-4 lg:p-6 hover:bg-[#d4c5b5] transition-colors group"
            >
              {/* Folder Name */}
              <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[28px] lg:text-[36px] text-[#3e3232] text-center uppercase mb-4">
                {folder.name}
              </h3>

              {/* Separator Line */}
              <div className="h-[2px] bg-[#3e3232] my-3" />

              {/* Article List */}
              <div className="space-y-2 text-left">
                {folder.articles.slice(0, 2).map((article, artIdx) => (
                  <div key={artIdx}>
                    <p className="font-['Didot:Bold',sans-serif] text-[16px] lg:text-[20px] text-[#3e3232] truncate">
                      {article}
                    </p>
                    <p className="font-['Heading_Now_Trial:57_Extrabold',sans-serif] text-[12px] lg:text-[14px] text-[#3e3232]">
                      AUTHOR NAME
                    </p>
                    {artIdx < 1 && (
                      <div className="h-[2px] border-t-2 border-dashed border-[#3e3232] my-2" />
                    )}
                  </div>
                ))}
                <p className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] text-center mt-2">
                  + {folder.articles.length - 2} more
                </p>
              </div>

              {/* Forward Arrow */}
              <div className="absolute top-4 right-4">
                <img src={imgForward} alt="" className="w-[32px] h-[32px] object-contain opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}

          {/* Add Folder Button */}
          <button className="h-[300px] border-4 border-black p-4 lg:p-6 hover:bg-[#d4c5b5] transition-colors flex flex-col items-center justify-center">
            <div className="mb-4">
              <img src={imgFolderIcon} alt="" className="size-[60px] object-contain" />
            </div>
            <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[32px] lg:text-[40px] text-[#3e3232] text-center uppercase leading-tight">
              ORGANIZE
            </p>
            <p className="font-['Heading_Now_Trial:26_Bold',sans-serif] text-[36px] text-[#3e3232] text-center">
              +
            </p>
          </button>
      </div>
    </div>
  );
}
