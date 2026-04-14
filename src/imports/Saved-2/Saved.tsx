import imgFavorite from "./e6a8f8e71edf1d58d7cc500052563898c462f1c6.png";
import imgBooks from "./63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook from "./e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark from "./b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";
import imgDelete from "./ae8fed934c032101fb86598b672afc295f070fe5.png";
import imgCheckedCheckbox from "./a7f27c44fe2ea69306588f5166f979d13bec2775.png";
import imgNewspaper from "./4f0aa71c72d019e89ad62475872b1ed8965ee693.png";
import imgFavoriteFolder from "./e6510d43cdc55b79401dceb4fd4bebd0cc357200.png";
import imgEditPencil from "./b0742025f771035f1f702f055e7db9e214a707e1.png";

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[13px] inset-[1.64%_29.13%_0_44.79%] items-center">
      <div className="relative shrink-0 size-[60px]" data-name="Favorite">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFavorite} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">following</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[9px] inset-[0_80.1%_1.64%_0] items-end">
      <div className="relative shrink-0 size-[60px]" data-name="Books">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBooks} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">Browse</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex gap-[15px] inset-[0_0_1.64%_75.36%] items-center">
      <div className="relative shrink-0 size-[60px]" data-name="Open Book">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgOpenBook} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">extension</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex inset-[0_59.7%_1.64%_24.39%] items-end">
      <div className="relative shrink-0 size-[60px]" data-name="Bookmark">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBookmark} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">saved</p>
    </div>
  );
}

function Folder() {
  return (
    <div className="absolute h-[137px] left-[119px] top-[2067px] w-[1489px]" data-name="folder">
      <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
      <p className="absolute font-['Heading_Now_Trial:25_Medium',sans-serif] inset-[31.39%_72.87%_32.12%_10.61%] leading-[50px] not-italic text-[#3e3232] text-[64px] text-center uppercase whitespace-pre">{`add a  new folder`}</p>
      <div className="absolute inset-[16.79%_92.01%_17.52%_1.95%]" data-name="Favorite Folder">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFavoriteFolder} />
      </div>
    </div>
  );
}

export default function Saved() {
  return (
    <div className="bg-[#e5d8c8] relative size-full" data-name="SAVED">
      <div className="absolute flex h-0 items-center justify-center left-[112px] top-[704px] w-[1490.003px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1490.003px]" data-name="Divider">
            <div className="absolute inset-[-10px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 10">
                <line id="Divider" stroke="var(--stroke-0, #3E3232)" strokeWidth="10" x2="1490" y1="5" y2="5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[61px] left-[260px] top-[612px] w-[1181px]" data-name="menu bar">
        <Frame2 />
        <Frame />
        <Frame3 />
        <Frame1 />
        <div className="absolute bottom-0 flex items-center justify-center left-[24.39%] right-[59.7%] top-full" style={{ containerType: "size" }}>
          <div className="flex-none h-[1px] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-2px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 188 2">
                  <line id="Line 8" stroke="var(--stroke-0, #3E3232)" strokeWidth="2" x2="188" y1="1" y2="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[507px] left-[-7px] top-[51px] w-[1742px]" data-name="Title Bar">
        <p className="absolute font-['Heading_Now_Trial:16_Bold',sans-serif] inset-[43.98%_0_36.09%_0] leading-[50px] not-italic text-[#3e3232] text-[500px] text-center tracking-[50px] uppercase">The LoDown</p>
        <div className="absolute flex inset-[5.42%_7.58%_94.58%_6.89%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[97734400000000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-10px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 10">
                  <line id="Divider" stroke="var(--stroke-0, #3E3232)" strokeWidth="10" x2="1490" y1="5" y2="5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-full flex items-center justify-center left-[6.89%] right-[7.58%] top-0" style={{ containerType: "size" }}>
          <div className="flex-none h-[97734400000000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-20px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 20">
                  <line id="Line 4" stroke="var(--stroke-0, #3E3232)" strokeWidth="20" x2="1490" y1="10" y2="10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex inset-[95.86%_7.58%_4.14%_6.89%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[87960900000000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-10px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 10">
                  <line id="Divider" stroke="var(--stroke-0, #3E3232)" strokeWidth="10" x2="1490" y1="5" y2="5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-[6.89%] right-[7.58%] top-full" style={{ containerType: "size" }}>
          <div className="flex-none h-[87960900000000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-20px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 20">
                  <line id="Line 6" stroke="var(--stroke-0, #3E3232)" strokeWidth="20" x2="1490" y1="10" y2="10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:26_Bold',sans-serif] h-[65px] leading-[50px] left-[827.5px] not-italic text-[#3e3232] text-[128px] text-center top-[844px] uppercase w-[1475px]">ORGANIZE YOUR SAVED ARTICLES INTO FOLDERS</p>
      <p className="absolute font-['Heading_Now_Trial:25_Medium',sans-serif] inset-[93.54%_7.87%_4.42%_84.95%] leading-[50px] not-italic text-[#3e3232] text-[64px] text-center uppercase whitespace-nowrap">all done!</p>
      <div className="absolute left-[343px] size-[90px] top-[2268px]" data-name="Delete">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDelete} />
      </div>
      <p className="absolute font-['Heading_Now_Trial:25_Medium',sans-serif] inset-[93.54%_81.02%_4.42%_6.71%] leading-[50px] not-italic text-[#3e3232] text-[64px] text-center uppercase whitespace-nowrap">Drag to remove</p>
      <div className="absolute left-[1357px] size-[90px] top-[2268px]" data-name="Checked Checkbox">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCheckedCheckbox} />
      </div>
      <div className="absolute h-[88px] left-[239px] top-[1179px] w-[1367px]" data-name="article">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Didot:Bold',sans-serif] inset-[21.59%_72.57%_21.59%_7.68%] leading-[50px] not-italic text-[#3e3232] text-[32px] whitespace-nowrap">Saved Article One</p>
        <div className="absolute inset-[15.91%_93.86%_15.91%_1.54%]" data-name="Newspaper">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgNewspaper} />
        </div>
      </div>
      <div className="absolute h-[88px] left-[239px] top-[1280px] w-[1367px]" data-name="article">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Didot:Bold',sans-serif] inset-[21.59%_72.57%_21.59%_7.68%] leading-[50px] not-italic text-[#3e3232] text-[32px] whitespace-nowrap">Saved Article Two</p>
        <div className="absolute inset-[15.91%_93.86%_15.91%_1.54%]" data-name="Newspaper">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgNewspaper} />
        </div>
      </div>
      <div className="absolute h-[88px] left-[239px] top-[1640px] w-[1367px]" data-name="article">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Didot:Bold',sans-serif] inset-[21.59%_72.57%_21.59%_7.68%] leading-[50px] not-italic text-[#3e3232] text-[32px] whitespace-nowrap">Saved Article One</p>
        <div className="absolute inset-[15.91%_93.86%_15.91%_1.54%]" data-name="Newspaper">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgNewspaper} />
        </div>
      </div>
      <div className="absolute h-[88px] left-[239px] top-[1741px] w-[1367px]" data-name="article">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Didot:Bold',sans-serif] inset-[21.59%_72.57%_21.59%_7.68%] leading-[50px] not-italic text-[#3e3232] text-[32px] whitespace-nowrap">Saved Article Two</p>
        <div className="absolute inset-[15.91%_93.86%_15.91%_1.54%]" data-name="Newspaper">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgNewspaper} />
        </div>
      </div>
      <div className="absolute h-[88px] left-[239px] top-[1381px] w-[1367px]" data-name="article">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Didot:Bold',sans-serif] inset-[21.59%_72.57%_21.59%_7.68%] leading-[50px] not-italic text-[#3e3232] text-[32px] whitespace-nowrap">Saved Article Three</p>
        <div className="absolute inset-[15.91%_93.86%_15.91%_1.54%]" data-name="Newspaper">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgNewspaper} />
        </div>
      </div>
      <div className="absolute h-[137px] left-[119px] top-[1033px] w-[1489px]" data-name="folder">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Heading_Now_Trial:25_Medium',sans-serif] inset-[31.39%_80.26%_32.12%_8.8%] leading-[50px] not-italic text-[#3e3232] text-[72px] text-center uppercase whitespace-nowrap">folder one</p>
        <div className="absolute inset-[16.79%_92.01%_17.52%_1.95%]" data-name="Favorite Folder">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFavoriteFolder} />
        </div>
        <div className="absolute inset-[25.55%_2.08%_25.55%_93.15%]" data-name="Edit Pencil">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgEditPencil} />
        </div>
      </div>
      <div className="absolute h-[137px] left-[119px] top-[1494px] w-[1489px]" data-name="folder">
        <div className="absolute border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Heading_Now_Trial:25_Medium',sans-serif] inset-[31.39%_80.26%_32.12%_8.8%] leading-[50px] not-italic text-[#3e3232] text-[72px] text-center uppercase whitespace-nowrap">folder two</p>
        <div className="absolute inset-[16.79%_92.01%_17.52%_1.95%]" data-name="Favorite Folder">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFavoriteFolder} />
        </div>
        <div className="absolute inset-[25.55%_2.08%_25.55%_93.15%]" data-name="Edit Pencil">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgEditPencil} />
        </div>
      </div>
      <Folder />
    </div>
  );
}