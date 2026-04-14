import { useEffect, useState } from 'react';
import imgFavorite from "../../imports/Frame29/e6a8f8e71edf1d58d7cc500052563898c462f1c6.png";
import imgBooks from "../../imports/Frame29/63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook from "../../imports/Frame29/e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark from "../../imports/Frame29/b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";

type Screen = 'browse' | 'saved' | 'following' | 'extension';

interface MastheadProps {
  activeScreen: Screen;
  onNavClick: (screen: Screen) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

export default function Masthead({ activeScreen, onNavClick, isLoginOpen, setIsLoginOpen }: MastheadProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLoginOpen) {
          setIsLoginOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLoginOpen, setIsLoginOpen]);

  const handleNavClick = (screen: Screen) => {
    if (!isLoginOpen) {
      onNavClick(screen);
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuOpen(true), 100);
    }
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div className="relative flex-shrink-0 bg-[#e5d8c8]" style={{ perspective: '1200px' }}>
      {/* Title Bar - Always Visible */}
      <div className="relative z-20 bg-[#e5d8c8]">
        {/* Top Border */}
        <div className="h-2 border-t-4 border-b-4 border-[#3e3232] mx-8 mt-4" />

        {/* Title */}
        <div className="text-center py-6 relative">
          <h1 className="font-['Heading_Now_Trial:16_Bold',sans-serif] text-[#3e3232] text-[60px] sm:text-[80px] lg:text-[100px] tracking-[6px] lg:tracking-[10px] uppercase leading-[1]">
            The LoDown
          </h1>

          {/* Sign In Button - Top Right */}
          <button
            onClick={handleSignInClick}
            className="absolute right-8 top-1/2 -translate-y-1/2 font-['Didot:Regular',sans-serif] text-[16px] lg:text-[20px] text-[#3e3232] underline hover:no-underline z-30"
          >
            {isLoginOpen ? 'Close' : 'Sign In'}
          </button>
        </div>

        {/* Bottom Border */}
        <div className="h-2 border-t-4 border-b-4 border-[#3e3232] mx-8" />
      </div>

      {/* Login Form - Behind folding menu */}
      {isLoginOpen && (
        <div className="relative z-0 bg-[#e5d8c8] border-x-4 border-b-4 border-[#3e3232] mx-8 p-8 max-w-md mx-auto">
          <h2 className="font-['Heading_Now_Trial:16_Bold',sans-serif] text-[32px] lg:text-[40px] text-[#3e3232] text-center tracking-[4px] uppercase mb-6">
            SIGN IN
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-['Didot:Regular',sans-serif] text-[16px] text-[#3e3232] mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border-2 border-[#3e3232] bg-[#e5d8c8] px-3 py-2 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] focus:outline-none focus:ring-2 focus:ring-[#3e3232]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-['Didot:Regular',sans-serif] text-[16px] text-[#3e3232] mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border-2 border-[#3e3232] bg-[#e5d8c8] px-3 py-2 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] focus:outline-none focus:ring-2 focus:ring-[#3e3232]"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full bg-[#3e3232] text-[#e5d8c8] py-3 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[18px] tracking-[1.8px] uppercase hover:bg-[#2a1f1f] transition-colors">
              Submit
            </button>

            <p className="text-center font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232]">
              Don't have an account?{' '}
              <button className="underline hover:no-underline">Register here</button>
            </p>
          </div>
        </div>
      )}

      {/* Navigation Menu - Folds Down */}
      <div
        className="relative z-10 bg-[#e5d8c8] transition-all duration-600 ease-in-out"
        style={{
          transformOrigin: 'top center',
          transform: isLoginOpen
            ? 'perspective(1200px) rotateX(-75deg)'
            : isMenuOpen
              ? 'perspective(1200px) rotateX(0deg)'
              : 'perspective(1200px) rotateX(-5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="px-8 lg:px-16 py-4 relative">
          <div className="flex items-end justify-center gap-6 lg:gap-12">
            {/* Browse */}
            <button
              onClick={() => handleNavClick('browse')}
              className="flex flex-col items-center gap-1 group relative"
            >
              <img src={imgBooks} alt="" className="size-[30px] lg:size-[40px] object-contain" />
              <span className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[24px] text-[#3e3232] tracking-[-1px] uppercase">
                Browse
              </span>
              {activeScreen === 'browse' && (
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#3e3232]" />
              )}
            </button>

            {/* Saved */}
            <button
              onClick={() => handleNavClick('saved')}
              className="flex flex-col items-center gap-1 group relative"
            >
              <img src={imgBookmark} alt="" className="size-[30px] lg:size-[40px] object-contain" />
              <span className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[24px] text-[#3e3232] tracking-[-1px] uppercase">
                Saved
              </span>
              {activeScreen === 'saved' && (
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#3e3232]" />
              )}
            </button>

            {/* Following */}
            <button
              onClick={() => handleNavClick('following')}
              className="flex flex-col items-center gap-1 group relative"
            >
              <img src={imgFavorite} alt="" className="size-[30px] lg:size-[40px] object-contain" />
              <span className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[24px] text-[#3e3232] tracking-[-1px] uppercase">
                Following
              </span>
              {activeScreen === 'following' && (
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#3e3232]" />
              )}
            </button>

            {/* Extension */}
            <button
              onClick={() => handleNavClick('extension')}
              className="flex flex-col items-center gap-1 group relative"
            >
              <img src={imgOpenBook} alt="" className="size-[30px] lg:size-[40px] object-contain" />
              <span className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[24px] text-[#3e3232] tracking-[-1px] uppercase">
                Extension
              </span>
              {activeScreen === 'extension' && (
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#3e3232]" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="h-[4px] bg-[#3e3232] mx-8" />
      </div>
    </div>
  );
}
