import imgExternalLink from "./3ee0f86e27fd4e13b1c060879edd61ce0246e430.png";
import imgIcon from "./47a3d880227128c5049b103a786b70588a65d966.png";
import imgHomeLocationWithMarkerOnMap from "./0a9b7125739c11e461b234f4747afacef6394082.png";
import imgFavorite from "./e6a8f8e71edf1d58d7cc500052563898c462f1c6.png";
import imgBooks from "./63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook from "./e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark from "./b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";
import imgScreenshot20260326At103115Pm1 from "./06ac4b72e9481ec1db45b6f5c9a98f63238ce534.png";
import imgMapPin from "./3c5a619fd59251b542a76826ae17ed480ad38149.png";

function Button() {
  return (
    <div className="absolute bg-[#e5d8c8] content-stretch flex h-[36px] items-center justify-center left-[271px] px-[13px] py-px top-[121px] w-[107px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">independent</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e5d8c8] content-stretch flex h-[36px] items-center justify-center px-[13px] py-px relative shrink-0 w-[92px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
      <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] leading-[50px] not-italic relative shrink-0 text-[#3e3232] text-[24px] text-center tracking-[2.4px] uppercase whitespace-nowrap">Non-profit</p>
    </div>
  );
}

function FilterButton() {
  return (
    <div className="absolute content-stretch flex items-center left-[384px] top-[121px]" data-name="filter button">
      <Button1 />
    </div>
  );
}

function PublicSource() {
  return (
    <div className="absolute contents left-[41px] top-[107px]" data-name="public source">
      <Button />
      <FilterButton />
      <div className="absolute h-[59px] left-[45px] top-[111px] w-[647px]" data-name="other news hover">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 647 59">
          <path d="M0 0H647V59H0V0Z" fill="var(--fill-0, #3E3232)" fillOpacity="0.1" id="Rectangle 50" />
        </svg>
        <p className="absolute font-['Heading_Now_Trial:66_Bold',sans-serif] inset-[5.08%_2.78%_5.08%_77.74%] leading-[50px] not-italic text-[#3e3232] text-[32px] uppercase">Visit</p>
        <div className="absolute inset-[5.08%_2.78%_5.08%_90.88%]" data-name="External Link">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExternalLink} />
        </div>
      </div>
      <p className="absolute font-['Heading_Now_Trial:35_Medium',sans-serif] h-[53px] leading-[50px] left-[71px] not-italic text-[#3e3232] text-[48px] top-[113px] uppercase w-[341px]">PUBLIC SOURCE</p>
    </div>
  );
}

function BottomRightBox() {
  return (
    <div className="absolute border-4 border-[#3e3232] border-solid h-[626px] left-[864px] overflow-clip top-[1019px] w-[738px]" data-name="bottom right box">
      <div className="absolute h-[59px] left-[41px] top-[528px] w-[647px]" data-name="other news hover">
        <p className="absolute font-['Heading_Now_Trial:35_Medium',sans-serif] inset-[5.08%_44.51%_5.08%_4.02%] leading-[50px] not-italic text-[#3e3232] text-[48px] uppercase">other news outlet</p>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 647 59">
          <path d="M0 0H647V59H0V0Z" fill="var(--fill-0, #3E3232)" fillOpacity="0.1" id="Rectangle 50" />
        </svg>
        <p className="absolute font-['Heading_Now_Trial:66_Bold',sans-serif] inset-[5.08%_2.78%_5.08%_77.74%] leading-[50px] not-italic text-[#3e3232] text-[32px] uppercase">Visit</p>
        <div className="absolute inset-[5.08%_2.78%_5.08%_90.88%]" data-name="External Link">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExternalLink} />
        </div>
      </div>
      <div className="absolute h-[59px] left-[41px] top-[309px] w-[647px]" data-name="other news hover">
        <p className="absolute font-['Heading_Now_Trial:35_Medium',sans-serif] inset-[5.08%_44.51%_5.08%_4.02%] leading-[50px] not-italic text-[#3e3232] text-[48px] uppercase">other news outlet</p>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 647 59">
          <path d="M0 0H647V59H0V0Z" fill="var(--fill-0, #3E3232)" fillOpacity="0.1" id="Rectangle 50" />
        </svg>
        <p className="absolute font-['Heading_Now_Trial:66_Bold',sans-serif] inset-[5.08%_2.78%_5.08%_77.74%] leading-[50px] not-italic text-[#3e3232] text-[32px] uppercase">Visit</p>
        <div className="absolute inset-[5.08%_2.78%_5.08%_90.88%]" data-name="External Link">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExternalLink} />
        </div>
      </div>
      <div className="absolute h-[59px] left-[41px] top-[377px] w-[647px]" data-name="other news hover">
        <p className="absolute font-['Heading_Now_Trial:35_Medium',sans-serif] inset-[5.08%_44.51%_5.08%_4.02%] leading-[50px] not-italic text-[#3e3232] text-[48px] uppercase">other news outlet</p>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 647 59">
          <path d="M0 0H647V59H0V0Z" fill="var(--fill-0, #3E3232)" fillOpacity="0.1" id="Rectangle 50" />
        </svg>
        <p className="absolute font-['Heading_Now_Trial:66_Bold',sans-serif] inset-[5.08%_2.78%_5.08%_77.74%] leading-[50px] not-italic text-[#3e3232] text-[32px] uppercase">Visit</p>
        <div className="absolute inset-[5.08%_2.78%_5.08%_90.88%]" data-name="External Link">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExternalLink} />
        </div>
      </div>
      <p className="absolute decoration-solid font-['Heading_Now_Trial:47_Extrabold',sans-serif] leading-[50px] left-[41px] not-italic right-[506px] text-[#3e3232] text-[64px] text-center top-[33px] tracking-[6.4px] underline uppercase whitespace-nowrap">nearby</p>
      <p className="absolute decoration-solid font-['Heading_Now_Trial:47_Extrabold',sans-serif] h-[184px] leading-[50px] left-[3px] not-italic right-[471px] text-[#3e3232] text-[64px] text-center top-[236px] tracking-[6.4px] underline uppercase">county</p>
      <p className="absolute decoration-solid font-['Heading_Now_Trial:47_Extrabold',sans-serif] h-[184px] leading-[50px] left-[-18px] not-italic right-[492px] text-[#3e3232] text-[64px] text-center top-[453px] tracking-[6.4px] underline uppercase">state</p>
      <div className="absolute h-[59px] left-[41px] top-[170px] w-[647px]" data-name="other news hover">
        <p className="absolute font-['Heading_Now_Trial:35_Medium',sans-serif] inset-[5.08%_44.51%_5.08%_4.02%] leading-[50px] not-italic text-[#3e3232] text-[48px] uppercase">other news outlet</p>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 647 59">
          <path d="M0 0H647V59H0V0Z" fill="var(--fill-0, #3E3232)" fillOpacity="0.1" id="Rectangle 50" />
        </svg>
        <p className="absolute font-['Heading_Now_Trial:66_Bold',sans-serif] inset-[5.08%_2.78%_5.08%_77.74%] leading-[50px] not-italic text-[#3e3232] text-[32px] uppercase">Visit</p>
        <div className="absolute inset-[5.08%_2.78%_5.08%_90.88%]" data-name="External Link">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExternalLink} />
        </div>
      </div>
      <PublicSource />
    </div>
  );
}

function Location() {
  return (
    <div className="absolute border-4 border-[#3e3232] border-solid h-[182px] left-[112px] overflow-clip top-[792px] w-[1491px]" data-name="location">
      <p className="-translate-x-1/2 absolute decoration-solid font-['Didot:Regular',sans-serif] leading-[30px] left-[995.5px] not-italic text-[#3e3232] text-[64px] text-center top-[72px] underline w-[475px]">Pittsburgh, PA</p>
      <div className="absolute left-[61px] size-[60px] top-[57px]" data-name="icon">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgIcon} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Didot:Regular',sans-serif] leading-[30px] left-[443px] not-italic text-[48px] text-black text-center top-[72px] w-[840px]">{`I’m looking for news near: `}</p>
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

function Button2() {
  return (
    <div className="absolute bg-[#e5d8c8] h-[52px] left-[116px] top-[1660px] w-[172px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#3e3232] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Browse() {
  return (
    <div className="absolute bg-[#e5d8c8] h-[1799px] left-0 top-0 w-[1728px]" data-name="BROWSE">
      <BottomRightBox />
      <Location />
      <div className="absolute h-[250px] left-[1369px] top-[758px] w-[210px]" data-name="Home Location with Marker on Map">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHomeLocationWithMarkerOnMap} />
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
      <div className="absolute h-[626px] left-[113px] pointer-events-none top-[1019px] w-[706px]" data-name="Screenshot 2026-03-26 at 10.31.15 PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgScreenshot20260326At103115Pm1} />
        <div aria-hidden="true" className="absolute border-4 border-[#3e3232] border-solid inset-0" />
      </div>
      <div className="absolute left-[533px] size-[60px] top-[1358px]" data-name="icon">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgIcon} />
      </div>
      <Button2 />
      <p className="-translate-x-1/2 absolute font-['Heading_Now_Trial:35_Medium',sans-serif] leading-[50px] left-[202px] not-italic text-[#3e3232] text-[32px] text-center top-[1660px] uppercase whitespace-nowrap">search map region</p>
    </div>
  );
}

function FilterButton1() {
  return <div className="absolute h-[52px] left-[171px] top-[1734px] w-[169px]" data-name="filter button" />;
}

export default function Frame4() {
  return (
    <div className="relative size-full">
      <Browse />
      <div className="absolute left-[331px] size-[60px] top-[1240px]" data-name="Map Pin">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMapPin} />
      </div>
      <div className="absolute left-[271px] size-[60px] top-[1489px]" data-name="Map Pin">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMapPin} />
      </div>
      <FilterButton1 />
      <div className="absolute left-[451px] size-[60px] top-[1369px]" data-name="Map Pin">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMapPin} />
      </div>
    </div>
  );
}