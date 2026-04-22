// AboutScreen.tsx

import newspaperImage from "../../imports/newspaper1.jpg";

export default function AboutScreen() {
  return (
    <div className="p-4 lg:p-8 bg-[#e5d8c8]">
      <div className="max-w-[1200px] mx-auto">

        {/* Masthead */}
        <div className="text-center mb-8 pb-8 border-b-4 border-[#3e3232]">

          <h1 className="font-['Didot:Regular',sans-serif] text-[48px] lg:text-[72px] text-[#3e3232] leading-tight mb-2">
            The Story
          </h1>
          <div className="h-[3px] bg-[#3e3232] w-24 mx-auto mb-4" />

        </div>

        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 auto-rows-max lg:auto-rows-auto">

          {/* Left column - main story */}
          <div className="lg:col-span-2">
            {/* Featured article */}
            <div className="border-4 border-[#3e3232] overflow-hidden mb-6">
              <img src={newspaperImage} alt="The LoDown newspaper" className="w-full h-auto object-cover" />
              <div className="bg-[#3e3232] text-[#e5d8c8] p-4">

                <p className="font-['Didot:Italic',sans-serif] italic text-[15px]">
                  Local journalism is more important than ever
                </p>
              </div>
            </div>

            {/* Main story text in columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[14px] lg:text-[15px] tracking-[2px] text-[#3e3232] mb-3 uppercase font-['Heading_Now_Trial:25_Medium',sans-serif]">
                  The Concept
                </div>
                <p className="font-['Didot:Regular',sans-serif] text-[18px] lg:text-[20px] text-[#3e3232] leading-relaxed">
                  The LoDown finds local news coverage of the stories you're already reading. Browse any national news site and instantly see how reporters in your area are covering the same topic.
                </p>
              </div>
              <div>
                <div className="text-[14px] lg:text-[15px] tracking-[2px] text-[#3e3232] mb-3 uppercase font-['Heading_Now_Trial:25_Medium',sans-serif]">
                  How It Works
                </div>
                <p className="font-['Didot:Regular',sans-serif] text-[18px] lg:text-[20px] text-[#3e3232] leading-relaxed">
                  Explore local papers by location and subject on our site. The browser extension quietly suggests local coverage as you read national news online.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Sidebar box 1 */}
            <div className="border-4 border-[#3e3232]">
              <div className="bg-[#3e3232] text-[#e5d8c8] p-4">
                <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[14px] tracking-[2px] uppercase">
                  By The Numbers
                </p>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <p className="font-['Didot:Regular',sans-serif] text-[56px] text-[#c2a26e] font-bold leading-none mb-1">6</p>
                  <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[14px] tracking-[1px] text-[#3e3232] uppercase">
                    Local Pittsburgh outlets
                  </p>
                </div>
                <div className="border-t-2 border-[#3e3232]/30 pt-4">
                  <p className="font-['Didot:Italic',sans-serif] italic text-[18px] text-[#3e3232] leading-relaxed">
                    Covering your community, every day.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar box 2 */}
            <div className="border-4 border-[#3e3232]">
              <div className="bg-[#3e3232] text-[#e5d8c8] p-4">
                <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[14px] tracking-[2px] uppercase">
                  Learn More
                </p>
              </div>
              <div className="p-4">
                <a
                  href="https://jkode.mmm.page/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-[#3e3232] bg-[#3e3232] text-[#e5d8c8] text-center py-3 px-4 font-['Didot:Regular',sans-serif] text-[18px] tracking-[1px] uppercase hover:bg-[#2a1f1f] transition-colors mb-4"
                >
                  Read Full Story
                </a>
                <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] text-center leading-relaxed">
                  Discover the vision behind The LoDown
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Section divider */}
        <div className="h-[4px] bg-[#3e3232] mb-8" />

        {/* The Problem Section - full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-[12px] lg:text-[14px] tracking-[3px] text-[#3e3232] mb-3 uppercase font-['Heading_Now_Trial:25_Medium',sans-serif]">
              The Challenge
            </div>
            <h2 className="font-['Didot:Regular',sans-serif] text-[36px] lg:text-[48px] text-[#3e3232] mb-4 leading-tight">
              Why This Matters
            </h2>
          </div>
          <div>
            <p className="font-['Didot:Italic',sans-serif] italic text-[18px] lg:text-[20px] text-[#3e3232] leading-relaxed opacity-85">
              Media ownership is concentrated among a handful of large entities. Local newspapers have been sold to conglomerates, and the outlets that remain, often under-resourced, are doing some of the most important journalism in the country.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
