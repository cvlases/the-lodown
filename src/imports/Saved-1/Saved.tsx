import imgFavorite from "./e6a8f8e71edf1d58d7cc500052563898c462f1c6.png";
import imgBooks from "./63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook from "./e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark from "./b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";
import imgFavoriteFolder from "./e6510d43cdc55b79401dceb4fd4bebd0cc357200.png";
import imgThumbnail from "./0d81e5f4d8867dd8a0ad9c81575367701ac2d74c.png";
import imgForward from "./4e526fabb82c20516912642f23228c444aa335df.png";
import imgThumbnail1 from "./e2190d62ea95a2e8deddb56cf9dd9487aa5ee893.png";

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

function ButtonMprNews() {
  return (
    <div className="absolute contents left-[226px] top-[135px]" data-name="Button: MPR News">
      <div className="absolute h-[62px] left-[230px] top-[139px] w-[211px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 211 62">
          <path d="M0 0H211V62H0V0Z" fill="var(--fill-0, #3E3232)" id="Rectangle 18" />
        </svg>
      </div>
      <p className="absolute font-['Didot:Regular',sans-serif] h-[29.524px] leading-[30px] left-[256.66px] not-italic text-[#e5d8c8] text-[24px] top-[155px] w-[183.879px]">MPR NEWS</p>
      <div className="absolute h-[28.54px] left-[416px] top-[155px] w-[17.9px]" data-name="Forward">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgForward} />
      </div>
    </div>
  );
}

function Story1() {
  return (
    <div className="absolute border-4 border-[#3e3232] border-solid h-[544px] left-[902px] overflow-clip top-[1783px] w-[700px]" data-name="story 2">
      <div className="absolute h-[565px] left-[-19px] top-[214px] w-[752px]" data-name="Thumbnail">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgThumbnail} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:53_Book',sans-serif] leading-[40px] left-[346px] not-italic text-[36px] text-black text-center top-[28px] w-[650px]">‘It would be a struggle’: Liam Conejo Ramos’ family fights possible deportation to Ecuador</p>
      <ButtonMprNews />
    </div>
  );
}

function LocalSourceBtn() {
  return (
    <div className="absolute contents left-[202px] top-[122px]" data-name="local source BTN">
      <div className="absolute h-[62px] left-[206px] top-[126px] w-[275px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 275 62">
          <path d="M0 0H275V62H0V0Z" fill="var(--fill-0, #3E3232)" id="Rectangle 18" />
        </svg>
      </div>
      <div className="absolute h-[45px] left-[446px] top-[135px] w-[33px]" data-name="Forward">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgForward} />
      </div>
      <p className="absolute font-['Didot:Regular',sans-serif] leading-[30px] left-[230px] not-italic text-[#e5d8c8] text-[24px] top-[142px] uppercase whitespace-nowrap">Public Source</p>
    </div>
  );
}

function Story() {
  return (
    <div className="absolute border-4 border-[#3e3232] border-solid h-[544px] left-[112px] overflow-clip top-[1783px] w-[700px]" data-name="story 1">
      <div className="absolute h-[501px] left-[-4px] top-[215px] w-[700px]" data-name="Thumbnail">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[114.35%] left-[-11.53%] max-w-none top-[-14.35%] w-[123.05%]" src={imgThumbnail1} />
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:53_Book',sans-serif] leading-[40px] left-[348.5px] not-italic text-[36px] text-black text-center top-[31px] w-[633px]">Council floats bills to limit cooperation with ICE in Pittsburgh</p>
      <LocalSourceBtn />
    </div>
  );
}

function BottomFrames() {
  return (
    <div className="absolute contents left-[112px] top-[1783px]" data-name="Bottom frames">
      <Story1 />
      <Story />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#e5d8c8] border-4 border-black border-solid h-[727px] left-[112px] overflow-clip top-[1008px] w-[1482px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[327.5px] not-italic text-[#3e3232] text-[36px] text-center top-[76px] w-[819px]">SAVED ARTICLE 1</p>
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
      <div className="absolute flex h-0 items-center justify-center left-[104px] top-[954px] w-[1490.003px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1490.003px]" data-name="Divider">
            <div className="absolute inset-[-5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 5">
                <line id="Divider" stroke="var(--stroke-0, #3E3232)" strokeWidth="5" x2="1490" y1="2.5" y2="2.5" />
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
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:25_Medium',sans-serif] h-[46px] leading-[50px] left-[434.5px] not-italic text-[#3e3232] text-[128px] text-center top-[845px] uppercase w-[289px]">FOLDER ONE</p>
      <div className="absolute inset-[32.54%_84.78%_61%_6.02%]" data-name="Favorite Folder">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFavoriteFolder} />
      </div>
      <BottomFrames />
      <Container />
    </div>
  );
}