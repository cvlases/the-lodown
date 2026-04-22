interface Props {
  onBrowseClick: () => void;
}

export default function ExtensionScreen({ onBrowseClick }: Props) {

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="text-[12px] lg:text-[14px] tracking-widest text-[#3e3232] mb-2 uppercase font-['Didot:Regular',sans-serif]">
            A Browser Companion
          </div>
          <h2 className="font-['Didot:Regular',sans-serif] text-[32px] lg:text-[56px] text-[#3e3232] mb-2">
            Local News, When You Need It
          </h2>
          <div className="h-[2px] bg-[#c2a26e] w-16 mx-auto mb-6" />
          <p className="font-['Didot:Italic',sans-serif] italic text-[18px] lg:text-[28px] text-[#3e3232] max-w-[800px] mx-auto">
            Introducing a browser companion that quietly suggests local coverage as you read national news
          </p>
        </div>

        <div className="h-[4px] bg-[#3e3232] mb-8" />

        {/* Installation Section */}
        <div className="text-center mb-8">
          <div className="text-[12px] lg:text-[14px] tracking-widest text-[#3e3232] mb-2 uppercase font-['Didot:Regular',sans-serif]">
            Get Started
          </div>
          <h3 className="font-['Didot:Regular',sans-serif] text-[32px] lg:text-[56px] text-[#3e3232] mb-2">
            Ready to Install?
          </h3>
          <div className="h-[2px] bg-[#c2a26e] w-16 mx-auto mb-6" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#3e3232] text-[#e5d8c8] px-6 py-3 font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] hover:bg-[#2a1f1f] transition-colors flex items-center justify-center gap-3 border-2 border-[#3e3232]">
              <ChromeIcon />
              add to Chrome
            </button>
            <button className="bg-transparent text-[#3e3232] px-6 py-3 font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] hover:bg-[#3e3232] hover:text-[#e5d8c8] transition-colors border-2 border-[#3e3232]">
              manual download
            </button>
          </div>
        </div>

        <div className="h-[4px] bg-[#3e3232] mb-8" />

        {/* Browse Section */}
        <div className="text-center mb-8">
          <div className="text-[12px] lg:text-[14px] tracking-widest text-[#3e3232] mb-2 uppercase font-['Didot:Regular',sans-serif]">
            Already Have It?
          </div>

          <div className="h-[2px] bg-[#c2a26e] w-16 mx-auto mb-6" />

          <button onClick={onBrowseClick} className="bg-[#ab909000] text-[#3a342e] px-8 py-3 font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] hover:bg-[#a99898] transition-colors border-2 border-[#3e3232]">
            Browse Local News
          </button>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 71 71" fill="none">
      <path
        d="M35.5 6.5L35.5 64.5M59 59L12 12M64.5 35.5L6.5 35.5M59 12L12 59"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}
