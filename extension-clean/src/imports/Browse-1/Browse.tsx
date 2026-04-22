import imgThumbnail from "./0d81e5f4d8867dd8a0ad9c81575367701ac2d74c.png";
import imgForward from "./4e526fabb82c20516912642f23228c444aa335df.png";
import imgThumbnail1 from "./e2190d62ea95a2e8deddb56cf9dd9487aa5ee893.png";
import imgIcon from "./47a3d880227128c5049b103a786b70588a65d966.png";
import imgImg from "./5651c7d3ef24ae096e73173821395536d87bea50.png";
import imgSearch from "./b5f7c3247d438fc5113d0ab4814c8dc2fd11e0cc.png";
import imgFavorite from "./e6a8f8e71edf1d58d7cc500052563898c462f1c6.png";
import imgBooks from "./63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook from "./e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark from "./b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";

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
    <div className="absolute border-4 border-[#3e3232] border-solid h-[544px] left-[909px] overflow-clip top-[1803px] w-[700px]" data-name="story 2">
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
    <div className="absolute border-4 border-[#3e3232] border-solid h-[544px] left-[119px] overflow-clip top-[1803px] w-[700px]" data-name="story 1">
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
    <div className="absolute contents left-[119px] top-[1803px]" data-name="Bottom frames">
      <Story1 />
      <Story />
    </div>
  );
}

function LocalSourceBtn1() {
  return (
    <div className="absolute contents left-[41px] top-[125px]" data-name="local source BTN">
      <div className="absolute h-[63px] left-[45px] top-[129px] w-[389px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 389 63">
          <path d="M0 0H389V63H0V0Z" fill="var(--fill-0, #3E3232)" id="Rectangle 18" />
        </svg>
      </div>
      <p className="absolute font-['Didot:Regular',sans-serif] leading-[30px] left-[70px] not-italic text-[#e5d8c8] text-[24px] top-[145px] w-[339px]">find your local source</p>
      <div className="absolute h-[29px] left-[392px] top-[145px] w-[33px]" data-name="Forward">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgForward} />
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="absolute border-4 border-[#3e3232] border-solid h-[219px] left-[1130px] overflow-clip top-[1536px] w-[479px]" data-name="location">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Didot:Regular',sans-serif] leading-[30px] left-[250.5px] not-italic text-[#3e3232] text-[36px] text-center top-[49px] underline w-[239px]">Pittsburgh, PA</p>
      <div className="absolute left-[66px] size-[60px] top-[34px]" data-name="icon">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgIcon} />
      </div>
      <LocalSourceBtn1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute border-4 border-[#3e3232] border-solid h-[473px] left-[1130px] not-italic overflow-clip text-[#3e3232] text-center top-[1027px] w-[479px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[30px] left-[236px] text-[24px] top-[263px] w-[440px]">Discover local journalism from independent sources, non-profits, and community voices across the country. Filter by location, topic, and more to find the stories that matter to you.</p>
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:15_Medium',sans-serif] h-[229px] leading-[0] left-[235.5px] text-[128px] top-[34px] tracking-[12.8px] uppercase w-[479px]">
        <span className="leading-[100px] text-[rgba(62,50,50,0.5)]">local newS</span>
        <span className="leading-[100px]">{` `}</span>
        <span className="font-['Heading_Now_Trial:37_Extrabold',sans-serif] leading-[100px]">amplified</span>
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#e5d8c8] border-4 border-black border-solid h-[727px] left-[119px] overflow-clip top-[1028px] w-[968px]" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[459.5px] not-italic text-[#3e3232] text-[36px] text-center top-[28px] w-[819px]">most saved local news article by lodown users</p>
      <div className="absolute h-[803px] left-[-4px] top-[93px] w-[994px]" data-name="IMG">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
      </div>
    </div>
  );
}

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

export default function Browse() {
  return (
    <div className="bg-[#e5d8c8] relative size-full" data-name="BROWSE">
      <BottomFrames />
      <Location />
      <Container />
      <Container1 />
      <div className="absolute h-[217px] left-[119px] top-[768px] w-[1490px]" data-name="Search Bar">
        <div className="absolute bg-[rgba(255,255,255,0)] border-4 border-[#3e3232] border-solid inset-0" />
        <p className="absolute font-['Didot:Regular',sans-serif] inset-[14.29%_33.22%_69.12%_2.82%] leading-[50px] not-italic text-[#3e3232] text-[48px] uppercase">{`search & filter`}</p>
        <div className="absolute bg-[rgba(255,255,255,0)] border-4 border-[#3e3232] border-solid inset-[54.84%_2.89%_13.82%_2.82%]" />
        <p className="absolute font-['Didot:Regular',sans-serif] inset-[58.99%_27.92%_24.42%_8.12%] leading-[50px] not-italic text-[#3e3232] text-[20px]">search stories, authors, topics...</p>
        <div className="absolute inset-[62.21%_93.89%_21.2%_4.16%]" data-name="Search">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgSearch} />
        </div>
      </div>
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
        <div className="absolute flex inset-[98.36%_80.1%_1.64%_0.08%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[3518440000000000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-2px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 2">
                  <line id="Line 8" stroke="var(--stroke-0, #3E3232)" strokeWidth="2" x2="234" y1="1" y2="1" />
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
      <p className="absolute font-['Didot:Regular',sans-serif] h-[127px] leading-[50px] left-[-1813px] not-italic text-[150px] text-white top-[1160px] tracking-[90px] uppercase w-[4970px]">browse</p>
      <p className="absolute font-['Didot:Regular',sans-serif] h-[127px] leading-[50px] left-[-1813px] not-italic text-[150px] text-white top-[3792px] tracking-[90px] uppercase w-[4970px]">saved</p>
    </div>
  );
}