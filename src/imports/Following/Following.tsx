import svgPaths from "./svg-yytausocwr";
import imgFavorite from "./e6a8f8e71edf1d58d7cc500052563898c462f1c6.png";
import imgBooks from "./63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook from "./e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark from "./b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";
import imgImage11 from "./cc6539111460f95d579b9ffcae4d5b705b150acb.png";

function Stories() {
  return (
    <div className="absolute bg-[#e5d8c8] h-[1047px] left-[106px] overflow-clip shadow-[-10px_4px_20px_0px_rgba(0,0,0,0.25)] top-[2100px] w-[530px] whitespace-nowrap" data-name="stories">
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] left-[217.5px] text-[64px] top-[110px] tracking-[6.4px]">stories</p>
      <div className="-translate-x-1/2 absolute font-['Heading_Now_Trial:56_Bold',sans-serif] leading-[0] left-[217.5px] text-[20px] top-[293px]">
        <p className="leading-[50px] mb-0">topics</p>
        <p className="leading-[50px]">e.g. following stories about ice</p>
      </div>
    </div>
  );
}

function Authors() {
  return (
    <div className="absolute bg-[#e5d8c8] h-[1047px] leading-[50px] left-[597px] overflow-clip shadow-[-10px_0px_20px_0px_rgba(62,50,50,0.36)] top-[2100px] w-[486px] whitespace-nowrap" data-name="authors">
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:25_Medium',sans-serif] left-[217.5px] text-[64px] top-[110px] tracking-[6.4px]">authors</p>
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:56_Bold',sans-serif] left-[217.5px] text-[20px] top-[284px]">stories by these authors</p>
    </div>
  );
}

function Communities() {
  return (
    <div className="absolute bg-[#e5d8c8] h-[1047px] leading-[50px] left-[1083px] overflow-clip shadow-[-10px_0px_20px_0px_rgba(62,50,50,0.36)] top-[2100px] w-[513px]" data-name="communities">
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:25_Medium',sans-serif] left-[256.5px] text-[64px] top-[108px] tracking-[6.4px] whitespace-nowrap">communites</p>
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:56_Bold',sans-serif] left-[261.5px] text-[20px] top-[261px] w-[419px]">other people can make collections of local stories and you can follow these??</p>
    </div>
  );
}

function BottomRow() {
  return (
    <div className="absolute contents left-[106px] not-italic text-black text-center top-[2100px] uppercase" data-name="Bottom row">
      <Stories />
      <Authors />
      <Communities />
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

function ReadBtn() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="Read Btn">
      <div className="absolute bg-[#3e3232] h-[61.268px] left-[143px] top-[148px] w-[185px]" data-name="BG" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[41px] leading-[50px] left-[236.5px] not-italic text-[#e5d8c8] text-[40px] text-center top-[158px] tracking-[-4px] uppercase w-[139px]">Read</p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="buttons">
      <ReadBtn />
    </div>
  );
}

function RecentStory() {
  return (
    <div className="bg-[#e5d8c8] col-2 h-[304px] relative row-1 shrink-0 w-[475px]" data-name="recent story">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Buttons />
        <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:44_Regular',sans-serif] h-[90px] leading-[50px] left-[235.5px] not-italic text-[#3e3232] text-[36px] text-center top-[31px] uppercase w-[375px]">articles that come up based on the selected filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ReadBtn1() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="Read Btn">
      <div className="absolute bg-[#3e3232] h-[61.268px] left-[143px] top-[148px] w-[185px]" data-name="BG" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[41px] leading-[50px] left-[236.5px] not-italic text-[#e5d8c8] text-[40px] text-center top-[158px] tracking-[-4px] uppercase w-[139px]">Read</p>
    </div>
  );
}

function Buttons1() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="buttons">
      <ReadBtn1 />
    </div>
  );
}

function RecentStory1() {
  return (
    <div className="bg-[#e5d8c8] col-3 h-[304px] relative row-1 shrink-0 w-[486px]" data-name="recent story">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Buttons1 />
        <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:44_Regular',sans-serif] h-[90px] leading-[50px] left-[235.5px] not-italic text-[#3e3232] text-[36px] text-center top-[31px] uppercase w-[375px]">articles that come up based on the selected filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ReadBtn2() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="Read Btn">
      <div className="absolute bg-[#3e3232] h-[61.268px] left-[143px] top-[148px] w-[185px]" data-name="BG" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[41px] leading-[50px] left-[236.5px] not-italic text-[#e5d8c8] text-[40px] text-center top-[158px] tracking-[-4px] uppercase w-[139px]">Read</p>
    </div>
  );
}

function Buttons2() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="buttons">
      <ReadBtn2 />
    </div>
  );
}

function RecentStory2() {
  return (
    <div className="bg-[#e5d8c8] col-2 h-[304px] relative row-2 shrink-0 w-[475px]" data-name="recent story">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Buttons2 />
        <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:44_Regular',sans-serif] h-[90px] leading-[50px] left-[235.5px] not-italic text-[#3e3232] text-[36px] text-center top-[31px] uppercase w-[375px]">articles that come up based on the selected filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ReadBtn3() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="Read Btn">
      <div className="absolute bg-[#3e3232] h-[61.268px] left-[143px] top-[148px] w-[185px]" data-name="BG" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[41px] leading-[50px] left-[236.5px] not-italic text-[#e5d8c8] text-[40px] text-center top-[158px] tracking-[-4px] uppercase w-[139px]">Read</p>
    </div>
  );
}

function Buttons3() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="buttons">
      <ReadBtn3 />
    </div>
  );
}

function RecentStory3() {
  return (
    <div className="bg-[#e5d8c8] col-3 h-[304px] relative row-2 shrink-0 w-[486px]" data-name="recent story">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Buttons3 />
        <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:44_Regular',sans-serif] h-[90px] leading-[50px] left-[235.5px] not-italic text-[#3e3232] text-[36px] text-center top-[31px] uppercase w-[375px]">articles that come up based on the selected filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ReadBtn4() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="Read Btn">
      <div className="absolute bg-[#3e3232] h-[61.268px] left-[143px] top-[148px] w-[185px]" data-name="BG" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[41px] leading-[50px] left-[236.5px] not-italic text-[#e5d8c8] text-[40px] text-center top-[158px] tracking-[-4px] uppercase w-[139px]">Read</p>
    </div>
  );
}

function Buttons4() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="buttons">
      <ReadBtn4 />
    </div>
  );
}

function RecentStory4() {
  return (
    <div className="bg-[#e5d8c8] col-2 h-[304px] relative row-3 shrink-0 w-[475px]" data-name="recent story">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Buttons4 />
        <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:44_Regular',sans-serif] h-[90px] leading-[50px] left-[235.5px] not-italic text-[#3e3232] text-[36px] text-center top-[31px] uppercase w-[375px]">articles that come up based on the selected filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ReadBtn5() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="Read Btn">
      <div className="absolute bg-[#3e3232] h-[61.268px] left-[143px] top-[148px] w-[185px]" data-name="BG" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[41px] leading-[50px] left-[236.5px] not-italic text-[#e5d8c8] text-[40px] text-center top-[158px] tracking-[-4px] uppercase w-[139px]">Read</p>
    </div>
  );
}

function Buttons5() {
  return (
    <div className="absolute contents left-[143px] top-[148px]" data-name="buttons">
      <ReadBtn5 />
    </div>
  );
}

function RecentStory5() {
  return (
    <div className="bg-[#e5d8c8] col-3 h-[304px] relative row-3 shrink-0 w-[486px]" data-name="recent story">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Buttons5 />
        <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:44_Regular',sans-serif] h-[90px] leading-[50px] left-[235.5px] not-italic text-[#3e3232] text-[36px] text-center top-[31px] uppercase w-[375px]">articles that come up based on the selected filters</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="-translate-x-1/2 absolute gap-x-[29px] gap-y-[29px] grid grid-cols-[___minmax(0,1fr)_fit-content(100%)_fit-content(100%)] grid-rows-[repeat(3,fit-content(100%))] left-[calc(50%+243.5px)] top-[740px] w-[1019px]">
      <RecentStory />
      <RecentStory1 />
      <RecentStory2 />
      <RecentStory3 />
      <RecentStory4 />
      <RecentStory5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#3e3232] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">pittsburgh</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#3e3232] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">greater pa</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">minnesota</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-[10px] items-center left-0 top-[53px]">
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[105px]" data-name="filter button">
        <Button />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[103px]" data-name="filter button">
        <Button1 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[99px]" data-name="filter button">
        <Button2 />
      </button>
    </div>
  );
}

function LineMdChevronDown() {
  return (
    <button className="block cursor-pointer overflow-clip relative size-full" data-name="line-md:chevron-down">
      <div className="absolute inset-[37.5%_20.83%_33.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-10.45%_-5.22%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.8619 28.931">
            <path d={svgPaths.p36f2f080} id="Vector" stroke="var(--stroke-0, #3E3232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function Button3() {
  return (
    <div className="bg-[#3e3232] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">non-profit</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">independent</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">substack</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-[10px] items-center left-0 top-[58px]">
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[106px]" data-name="filter button">
        <Button3 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[113px]" data-name="filter button">
        <Button4 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[91px]" data-name="filter button">
        <Button5 />
      </button>
    </div>
  );
}

function LineMdChevronDown1() {
  return (
    <button className="block cursor-pointer overflow-clip relative size-full" data-name="line-md:chevron-down">
      <div className="absolute inset-[37.5%_20.83%_33.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-10.39%_-5.19%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.1271 29.0635">
            <path d={svgPaths.p1b714b18} id="Vector" stroke="var(--stroke-0, #3E3232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function Button6() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">written</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">audio</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#3e3232] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">video</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-[10px] items-center left-0 top-[58px]">
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[83px]" data-name="filter button">
        <Button6 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[64px]" data-name="filter button">
        <Button7 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[63px]" data-name="filter button">
        <Button8 />
      </button>
    </div>
  );
}

function LineMdChevronDown2() {
  return (
    <button className="block cursor-pointer overflow-clip relative size-full" data-name="line-md:chevron-down">
      <div className="absolute inset-[37.5%_20.83%_33.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-10.42%_-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.9943 28.9971">
            <path d={svgPaths.p3b4ce980} id="Vector" stroke="var(--stroke-0, #3E3232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3e3232] col-1 h-[44px] ml-0 mt-[3px] row-1 w-[34px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-[7px] mt-0 not-italic relative row-1 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">ice</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3e3232] col-1 h-[44px] ml-0 mt-[3px] row-1 w-[106px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-0 mt-0 not-italic relative row-1 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase w-[104px]">stormwater</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3e3232] col-1 h-[44px] ml-0 mt-[3px] row-1 w-[93px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-[7px] mt-0 not-italic relative row-1 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">pittsburgh</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center leading-[0] left-0 top-[57px]">
      <Group4 />
      <Group5 />
      <Group6 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[71.05%_68.65%_9.65%_0.28%]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112.5 44">
        <g id="Group 17">
          <path d="M112 0.5V43.5H0.5V0.5H112Z" fill="var(--fill-0, #E5D8C8)" id="Rectangle 27" stroke="var(--stroke-0, #3E3232)" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[69.3%_68.65%_8.77%_0.28%]">
      <Group3 />
      <p className="absolute font-['Heading_Now_Trial:25_Medium',sans-serif] inset-[69.3%_68.78%_8.77%_0.83%] leading-[50px] not-italic text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase">{`arts&Culture`}</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3e3232] col-1 h-[44px] ml-0 mt-[3px] row-1 w-[68px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-[7px] mt-0 not-italic relative row-1 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">protest</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3e3232] col-1 h-[44px] ml-0 mt-[3px] row-1 w-[46px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-[7px] mt-0 not-italic relative row-1 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">dogs</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#e5d8c8] border border-[#3e3232] border-solid col-1 h-[44px] ml-0 mt-[3px] row-1 w-[69px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-[6px] mt-0 not-italic relative row-1 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">politics</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#e5d8c8] border border-[#3e3232] border-solid col-1 h-[44px] ml-0 mt-[3px] row-1 w-[142px]" />
      <p className="col-1 font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] ml-[3px] mt-0 not-italic relative row-1 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase w-[135px]">farmers markets</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center leading-[0] left-0 top-[108px]">
      <Group7 />
      <Group10 />
      <Group11 />
      <Group8 />
    </div>
  );
}

function LineMdChevronDown3() {
  return (
    <button className="block cursor-pointer overflow-clip relative size-full" data-name="line-md:chevron-down">
      <div className="absolute inset-[37.5%_20.83%_33.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-10.42%_-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.9942 28.9971">
            <path d={svgPaths.p15bd5200} id="Vector" stroke="var(--stroke-0, #3E3232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function Button9() {
  return (
    <div className="bg-[#3e3232] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">public source</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">kbzq</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-[10px] items-center left-0 top-[54px]">
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[126px]" data-name="filter button">
        <Button9 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[58px]" data-name="filter button">
        <Button10 />
      </button>
    </div>
  );
}

function LineMdChevronDown4() {
  return (
    <button className="block cursor-pointer overflow-clip relative size-full" data-name="line-md:chevron-down">
      <div className="absolute inset-[37.5%_20.83%_33.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-10.33%_-5.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.3952 29.1976">
            <path d={svgPaths.p6a2680} id="Vector" stroke="var(--stroke-0, #3E3232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function Button11() {
  return (
    <div className="bg-[#3e3232] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#e5d8c8] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">kayla ishibashi</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[52px] items-center justify-center px-[13px] py-px relative shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">hank herald</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-[10px] items-center left-px top-[53px]">
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[139px]" data-name="filter button">
        <Button11 />
      </button>
      <button className="content-stretch flex h-[52px] items-center relative shrink-0 w-[115px]" data-name="filter button">
        <Button12 />
      </button>
    </div>
  );
}

function LineMdChevronDown5() {
  return (
    <button className="block cursor-pointer overflow-clip relative size-full" data-name="line-md:chevron-down">
      <div className="absolute inset-[37.5%_20.83%_33.33%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-10.33%_-5.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.3955 29.1978">
            <path d={svgPaths.p3ec36e80} id="Vector" stroke="var(--stroke-0, #3E3232)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function FilteringBar() {
  return (
    <div className="absolute bg-[#e5d8c8] left-[112px] top-[740px] w-[486px]" data-name="Filtering bar">
      <div className="content-stretch flex flex-col gap-[15px] items-start overflow-clip px-[24px] py-[53px] relative rounded-[inherit] size-full">
        <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] min-w-full not-italic relative shrink-0 text-[#3e3232] text-[64px] text-center tracking-[6.4px] uppercase w-[min-content]">FILTers</p>
        <div className="h-[137px] relative shrink-0 w-full" data-name="location">
          <p className="-translate-x-1/2 absolute bottom-[63.5%] font-['Heading_Now_Trial:56_Bold',sans-serif] leading-[50px] left-[63.5px] not-italic text-[#3e3232] text-[30px] text-center top-0 tracking-[3px] uppercase whitespace-nowrap">location</p>
          <div className="absolute bottom-0 flex items-center justify-center left-[1.1%] right-0 top-full" style={{ containerType: "size" }}>
            <div className="flex-none h-[586406000000000cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 433.174 1">
                    <line id="Line 38" stroke="var(--stroke-0, #3E3232)" strokeDasharray="2 2" x2="433.174" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Frame9 />
          <div className="absolute aspect-[24/24] flex items-center justify-center left-[81.27%] right-0 top-[-11px]" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <LineMdChevronDown />
            </div>
          </div>
        </div>
        <div className="h-[145px] relative shrink-0 w-full" data-name="type">
          <p className="-translate-x-1/2 absolute bottom-[65.52%] font-['Heading_Now_Trial:56_Bold',sans-serif] leading-[50px] left-[31.5px] not-italic text-[#3e3232] text-[30px] text-center top-0 tracking-[3px] uppercase whitespace-nowrap">type</p>
          <div className="absolute bottom-0 flex items-center justify-center left-[0.55%] right-0 top-full" style={{ containerType: "size" }}>
            <div className="flex-none h-[439805000000000cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 435.574 1">
                    <line id="Line 39" stroke="var(--stroke-0, #3E3232)" strokeDasharray="2 2" x2="435.574" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Frame10 />
          <div className="absolute aspect-[24/24] flex items-center justify-center left-[81.72%] right-[-0.55%] top-[-11px]" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <LineMdChevronDown1 />
            </div>
          </div>
        </div>
        <div className="h-[150px] relative shrink-0 w-full" data-name="media">
          <p className="absolute font-['Heading_Now_Trial:56_Bold',sans-serif] inset-[0_77.07%_66.67%_0] leading-[50px] not-italic text-[#3e3232] text-[30px] tracking-[3px] uppercase whitespace-nowrap">MEdia</p>
          <div className="absolute bottom-0 flex items-center justify-center left-[0.83%] right-0 top-full" style={{ containerType: "size" }}>
            <div className="flex-none h-[439805000000000cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 434.372 1">
                    <line id="Line 35" stroke="var(--stroke-0, #3E3232)" strokeDasharray="2 2" x2="434.372" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Frame11 />
          <div className="absolute aspect-[24/24] flex items-center justify-center left-[81.49%] right-[-0.28%] top-[-11px]" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <LineMdChevronDown2 />
            </div>
          </div>
        </div>
        <div className="h-[228px] relative shrink-0 w-full" data-name="topics">
          <Frame12 />
          <Group9 />
          <Frame13 />
          <p className="-translate-x-1/2 absolute bottom-[78.07%] font-['Heading_Now_Trial:56_Bold',sans-serif] leading-[50px] left-[46.5px] not-italic text-[#3e3232] text-[30px] text-center top-0 tracking-[3px] uppercase whitespace-nowrap">TOPICS</p>
          <div className="absolute bottom-0 flex items-center justify-center left-[0.83%] right-0 top-full" style={{ containerType: "size" }}>
            <div className="flex-none h-[439805000000000cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 434.37 1">
                    <line id="Line 36" stroke="var(--stroke-0, #3E3232)" strokeDasharray="2 2" x2="434.37" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute aspect-[24/24] flex items-center justify-center left-[81.49%] right-[-0.28%] top-[-11px]" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <LineMdChevronDown3 />
            </div>
          </div>
        </div>
        <div className="h-[134px] relative shrink-0 w-full" data-name="sources">
          <p className="-translate-x-1/2 absolute bottom-[62.69%] font-['Heading_Now_Trial:56_Bold',sans-serif] leading-[50px] left-[59.5px] not-italic text-[#3e3232] text-[30px] text-center top-0 tracking-[3px] uppercase whitespace-nowrap">Sources</p>
          <div className="absolute bottom-0 flex items-center justify-center left-0 right-0 top-full" style={{ containerType: "size" }}>
            <div className="flex-none h-[439805000000000cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 438 1">
                    <line id="Line 37" stroke="var(--stroke-0, #3E3232)" strokeDasharray="2 2" x2="438" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Frame14 />
          <div className="absolute aspect-[24/24] flex items-center justify-center left-[82.17%] right-[-1.11%] top-[-11px]" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <LineMdChevronDown4 />
            </div>
          </div>
        </div>
        <div className="h-[106px] relative shrink-0 w-full" data-name="authors">
          <p className="absolute bottom-[52.83%] font-['Heading_Now_Trial:56_Bold',sans-serif] leading-[50px] left-0 not-italic text-[#3e3232] text-[30px] top-0 tracking-[3px] uppercase w-[133px]">authors</p>
          <Frame15 />
          <div className="absolute aspect-[24/24] flex items-center justify-center left-[82.17%] right-[-1.11%] top-[-11px]" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <LineMdChevronDown5 />
            </div>
          </div>
        </div>
        <p className="font-['Heading_Now_Trial:56_Bold',sans-serif] h-[43px] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[30px] text-center tracking-[3px] uppercase w-[273px]">make adjustments</p>
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[17px] top-[477px]">
      <div className="absolute bg-[#3e3232] h-[58.664px] left-[21px] top-[481px] w-[592.899px]" />
      <div className="absolute bg-[#3e3232] left-[691.34px] size-[58.664px] top-[481px]" />
      <div className="absolute bg-[#3e3232] left-[623.29px] size-[58.664px] top-[481px]" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[39px] leading-[50px] left-[332px] not-italic text-[#e5d8c8] text-[40px] text-center top-[489px] tracking-[-4px] uppercase w-[120px]">Read</p>
    </div>
  );
}

function MaterialSymbolsBookmark() {
  return (
    <div className="absolute h-[39px] left-[629px] top-[486.66px] w-[40px]" data-name="material-symbols:bookmark">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 39">
        <g id="material-symbols:bookmark">
          <path d={svgPaths.p2cd63800} fill="var(--fill-0, #E5D8C8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaterialSymbolsFavorite() {
  return (
    <div className="absolute left-[699px] size-[36px] top-[487.66px]" data-name="material-symbols:favorite">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="material-symbols:favorite">
          <path d={svgPaths.p1b154600} fill="var(--fill-0, #FE7200)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Favorites() {
  return (
    <div className="absolute bg-[#e5d8c8] border-4 border-[#3e3232] border-solid h-[559px] left-[891px] overflow-clip top-[1616px] w-[772px]" data-name="FAVORITES">
      <Group1 />
      <MaterialSymbolsBookmark />
      <MaterialSymbolsFavorite />
      <p className="-translate-x-1/2 absolute font-['Didot:Italic',sans-serif] italic leading-[50px] left-[381.5px] text-[#3e3232] text-[36px] text-center top-[24px] w-[651px]">article name</p>
      <div className="absolute h-[375px] left-[48px] top-[88px] w-[667px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[17px] top-[477px]">
      <div className="absolute bg-[#3e3232] h-[58.664px] left-[21px] top-[481px] w-[592.899px]" />
      <div className="absolute bg-[#3e3232] left-[691.34px] size-[58.664px] top-[481px]" />
      <div className="absolute bg-[#3e3232] left-[623.29px] size-[58.664px] top-[481px]" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] h-[39px] leading-[50px] left-[332px] not-italic text-[#e5d8c8] text-[40px] text-center top-[489px] tracking-[-4px] uppercase w-[120px]">Read</p>
    </div>
  );
}

function MaterialSymbolsBookmark1() {
  return (
    <div className="absolute h-[39px] left-[629px] top-[486.66px] w-[40px]" data-name="material-symbols:bookmark">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 39">
        <g id="material-symbols:bookmark">
          <path d={svgPaths.p2cd63800} fill="var(--fill-0, #FE7200)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaterialSymbolsFavorite1() {
  return (
    <div className="absolute left-[699px] size-[36px] top-[487.66px]" data-name="material-symbols:favorite">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="material-symbols:favorite">
          <path d={svgPaths.p1b154600} fill="var(--fill-0, #E5D8C8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Bookmarks() {
  return (
    <div className="absolute bg-[#e5d8c8] border-4 border-[#3e3232] border-solid h-[559px] left-[66px] overflow-clip top-[1616px] w-[772px]" data-name="BOOKMARKS">
      <Group2 />
      <MaterialSymbolsBookmark1 />
      <MaterialSymbolsFavorite1 />
      <p className="-translate-x-1/2 absolute font-['Didot:Italic',sans-serif] italic leading-[50px] left-[381.5px] text-[#3e3232] text-[36px] text-center top-[24px] w-[651px]">article name</p>
      <div className="absolute h-[375px] left-[48px] top-[88px] w-[667px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
      </div>
    </div>
  );
}

function BookmarksFavs() {
  return (
    <div className="absolute contents left-[44px] top-[1566px]" data-name="bookmarks + favs">
      <Favorites />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[1276.5px] not-italic text-[#3e3232] text-[36px] text-center top-[1566px] w-[819px]">FAVORITES</p>
      <Bookmarks />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[453.5px] not-italic text-[#3e3232] text-[36px] text-center top-[1566px] w-[819px]">BOOKMARKS</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_8.33%_0.77%_8.33%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.1667 64.5331">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2035c9c0} fill="var(--fill-0, #E5D8C8)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MingcuteChromeFill() {
  return (
    <div className="absolute left-[443px] overflow-clip size-[71px] top-[1221px]" data-name="mingcute:chrome-fill">
      <Group />
    </div>
  );
}

function AddToChrome() {
  return (
    <div className="absolute contents left-[431px] top-[1211px]" data-name="add to chrome">
      <div className="absolute bg-[#3e3232] h-[90px] left-[431px] rounded-[10px] top-[1211px] w-[419px]" />
      <MingcuteChromeFill />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[670px] not-italic text-[#e5d8c8] text-[40px] text-center top-[1231px] whitespace-nowrap">add to Chrome</p>
    </div>
  );
}

function ManualDownload() {
  return (
    <div className="absolute contents left-[878px] top-[1211px]" data-name="manual download">
      <div className="absolute bg-[#3e3232] h-[90px] left-[878px] rounded-[10px] top-[1211px] w-[419px]" />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[1088px] not-italic text-[#e5d8c8] text-[40px] text-center top-[1231px] whitespace-nowrap">manual download</p>
    </div>
  );
}

function Buttons6() {
  return (
    <div className="absolute contents left-[431px] top-[1211px]" data-name="Buttons">
      <AddToChrome />
      <ManualDownload />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex gap-[13px] inset-[1.64%_29.13%_0_44.79%] items-center">
      <div className="relative shrink-0 size-[60px]" data-name="Favorite">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgFavorite} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">following</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[9px] inset-[0_80.1%_1.64%_0] items-end">
      <div className="relative shrink-0 size-[60px]" data-name="Books">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBooks} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">Browse</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[15px] inset-[0_0_1.64%_75.36%] items-center">
      <div className="relative shrink-0 size-[60px]" data-name="Open Book">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgOpenBook} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">extension</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex inset-[0_59.7%_1.64%_24.39%] items-end">
      <div className="relative shrink-0 size-[60px]" data-name="Bookmark">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBookmark} />
      </div>
      <p className="font-['Didot:Regular',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[40px] text-center tracking-[-4px] uppercase whitespace-nowrap">saved</p>
    </div>
  );
}

function Extension() {
  return (
    <div className="absolute bg-[#e5d8c8] h-[2446px] left-0 top-[3618px] w-[1728px]" data-name="EXTENSION">
      <BookmarksFavs />
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[calc(50%+0.5px)] not-italic text-[#3e3232] text-[90px] text-center top-[1438px] w-[1351px]">Already Have The LoDown?</p>
      <Buttons6 />
      <div className="-translate-x-1/2 absolute flex h-0 items-center justify-center left-1/2 top-[1144px] w-[1038px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1038px]" data-name="Divider 2">
            <div className="absolute inset-[-5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 10">
                <path d="M0 5H1038M0 5H1038" id="Divider 2" stroke="var(--stroke-0, #3E3232)" strokeWidth="10" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[50px] left-[calc(50%+0.5px)] not-italic text-[#3e3232] text-[90px] text-center top-[863px] w-[1351px]">Local News, When You Need It</p>
      <p className="-translate-x-1/2 absolute font-['Didot:Italic',sans-serif] h-[78px] italic leading-[50px] left-1/2 text-[#3e3232] text-[40px] text-center top-[955px] w-[1058px]">Introducing a browser companion that quietly suggests local coverage as you read national news</p>
      <div className="absolute flex h-0 items-center justify-center left-[112px] top-[709px] w-[1490.003px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1490.003px]" data-name="Divider">
            <div className="absolute inset-[-5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 10">
                <path d="M0 5H1490M0 5H1490" id="Divider" stroke="var(--stroke-0, #3E3232)" strokeWidth="10" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[61px] left-[260px] top-[612px] w-[1181px]" data-name="menu bar">
        <Frame4 />
        <Frame5 />
        <Frame6 />
        <Frame7 />
        <div className="absolute bottom-0 flex items-center justify-center left-[75.36%] right-0 top-full" style={{ containerType: "size" }}>
          <div className="flex-none h-[1759220000000000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-2px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291 2">
                  <line id="Line 10" stroke="var(--stroke-0, #3E3232)" strokeWidth="2" x2="291" y1="1" y2="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[507px] left-[-7px] top-[51px] w-[1742px]" data-name="title bar">
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
    </div>
  );
}

export default function Following() {
  return (
    <div className="bg-[#e5d8c8] relative size-full" data-name="FOLLOWING">
      <div className="absolute flex h-0 items-center justify-center left-[106px] top-[2028px] w-[1490.003px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1490.003px]" data-name="Divider 2">
            <div className="absolute inset-[-10px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1490 10">
                <line id="Divider" stroke="var(--stroke-0, #3E3232)" strokeWidth="10" x2="1490" y1="5" y2="5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <BottomRow />
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
        <div className="absolute bottom-0 flex items-center justify-center left-[45.55%] right-[28.87%] top-full" style={{ containerType: "size" }}>
          <div className="flex-none h-[679749000cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-2px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 302 2">
                  <line id="Line 9" stroke="var(--stroke-0, #3E3232)" strokeWidth="2" x2="302" y1="1" y2="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[507px] left-1/2 top-[51px] w-[1742px]" data-name="Title Bar">
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
      <Frame8 />
      <FilteringBar />
      <Extension />
    </div>
  );
}