// Masthead.tsx — persistent header with title, nav, and auth
//
// Auth states:
//   logged out → "Sign In" button opens a form with Sign In / Register tabs
//   logged in  → shows truncated email + Sign Out link

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import imgFollowing from "../../imports/icon-following.svg";
import imgBooks     from "../../imports/Frame29/63c86cc538ebcce955adc8fe5bc6a1427bf54d93.png";
import imgOpenBook  from "../../imports/Frame29/e5fc9fba73bdd6faf0af3d9f11427e9251768390.png";
import imgBookmark  from "../../imports/Frame29/b9fbbce8452ecbc8c86b15c9f2b3b06ef7aa1941.png";
import imgAbout     from "../../imports/about.png";

type Screen = 'browse' | 'saved' | 'following' | 'extension' | 'about';

interface MastheadProps {
  activeScreen: Screen;
  onNavClick: (screen: Screen) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  user: User | null;
}

export default function Masthead({ activeScreen, onNavClick, isLoginOpen, setIsLoginOpen, user }: MastheadProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Auth form state
  const [authMode, setAuthMode]       = useState<'signin' | 'signup'>('signin');
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [authError, setAuthError]     = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginOpen) setIsLoginOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLoginOpen, setIsLoginOpen]);

  // Reset form when closed
  useEffect(() => {
    if (!isLoginOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setAuthError('');
      setAuthMode('signin');
    }
  }, [isLoginOpen]);

  const handleNavClick = (screen: Screen) => {
    if (!isLoginOpen) {
      onNavClick(screen);
      setIsMenuOpen(false);
      setTimeout(() => setIsMenuOpen(true), 100);
    }
  };

  const handleAuth = async () => {
    if (authMode === 'signup' && !name.trim()) { setAuthError('Please enter your name.'); return; }
    if (!email || !password) { setAuthError('Please fill in all fields.'); return; }
    setAuthLoading(true);
    setAuthError('');

    if (authMode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() } },
      });
      if (error) setAuthError(error.message);
      else setAuthError('Account created! Check your email to confirm, then sign in.');
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative flex-shrink-0 bg-[#e5d8c8]" style={{ perspective: '1200px' }}>

      {/* ── Nameplate ─────────────────────────────────────────────── */}
      <div className="relative z-20 bg-[#e5d8c8]">

        {/* Top thick rule */}
        <div className="h-[6px] bg-[#3e3232] mt-3 mx-6" />
        <div className="h-[1.5px] bg-[#3e3232] mt-[3px] mx-6" />

        {/* Folio line — date · location · auth */}
        <div className="flex items-center justify-between px-6 py-1.5">
          <span className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[10px] lg:text-[11px] tracking-[2px] text-[#3e3232] uppercase">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[10px] lg:text-[11px] tracking-[2px] text-[#3e3232] uppercase hidden sm:block">
            Pittsburgh, PA · Local News
          </span>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="font-['Didot:Italic',sans-serif] italic text-[11px] text-[#3e3232] hidden lg:inline opacity-70">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <button onClick={handleSignOut} className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[10px] lg:text-[11px] tracking-[2px] text-[#3e3232] uppercase underline hover:no-underline">
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => setIsLoginOpen(!isLoginOpen)} className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[10px] lg:text-[11px] tracking-[2px] text-[#3e3232] uppercase underline hover:no-underline">
                {isLoginOpen ? 'Close' : 'Sign In'}
              </button>
            )}
          </div>
        </div>

        <div className="h-[1.5px] bg-[#3e3232] mx-6" />

        {/* Nameplate */}
        <div className="text-center pt-3 pb-1">
          <h1 className="font-['Heading_Now_Trial:16_Bold',sans-serif] text-[#3e3232] text-[60px] sm:text-[80px] lg:text-[110px] tracking-[4px] lg:tracking-[8px] uppercase leading-none">
            The LoDown
          </h1>
        </div>

        {/* Tagline */}
        <div className="text-center pb-3">
          <p className="font-['Didot:Italic',sans-serif] italic text-[13px] lg:text-[15px] text-[#3e3232] tracking-[1px] opacity-70">
            Big news, closer to home.
          </p>
        </div>

        {/* Bottom thick rule */}
        <div className="h-[1.5px] bg-[#3e3232] mx-6" />
        <div className="h-[5px] bg-[#3e3232] mt-[3px] mx-6" />

      </div>

      {/* ── Auth modal ─────────────────────────────────────────────── */}
      {/* Fixed overlay: blurs the page, centers the form */}
      {isLoginOpen && !user && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(62,50,50,0.35)' }}
          onClick={() => setIsLoginOpen(false)}
        >
          {/* Stop clicks inside the form from closing the modal */}
          <div
            className="bg-[#e5d8c8] border-4 border-[#3e3232] p-8 w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsLoginOpen(false)}
                className="font-['Didot:Regular',sans-serif] text-[20px] text-[#3e3232] hover:opacity-50 leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Sign In / Register tabs */}
            <div className="flex border-b-2 border-[#3e3232] mb-6">
              {(['signin', 'signup'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => { setAuthMode(mode); setAuthError(''); }}
                  className={`flex-1 py-2 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[16px] tracking-[2px] uppercase transition-colors ${
                    authMode === mode
                      ? 'bg-[#3e3232] text-[#e5d8c8]'
                      : 'text-[#3e3232] hover:bg-[rgba(62,50,50,0.08)]'
                  }`}
                >
                  {mode === 'signin' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block font-['Didot:Regular',sans-serif] text-[16px] text-[#3e3232] mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAuth()}
                    placeholder="Your name"
                    autoFocus
                    className="w-full border-2 border-[#3e3232] bg-[#e5d8c8] px-3 py-2 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] focus:outline-none focus:ring-2 focus:ring-[#3e3232]"
                  />
                </div>
              )}
              <div>
                <label className="block font-['Didot:Regular',sans-serif] text-[16px] text-[#3e3232] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAuth()}
                  placeholder="your@email.com"
                  autoFocus={authMode === 'signin'}
                  className="w-full border-2 border-[#3e3232] bg-[#e5d8c8] px-3 py-2 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] focus:outline-none focus:ring-2 focus:ring-[#3e3232]"
                />
              </div>
              <div>
                <label className="block font-['Didot:Regular',sans-serif] text-[16px] text-[#3e3232] mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAuth()}
                  placeholder="••••••••"
                  className="w-full border-2 border-[#3e3232] bg-[#e5d8c8] px-3 py-2 font-['Didot:Regular',sans-serif] text-[14px] text-[#3e3232] focus:outline-none focus:ring-2 focus:ring-[#3e3232]"
                />
              </div>

              {authError && (
                <p className="font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-80">
                  {authError}
                </p>
              )}

              <button
                onClick={handleAuth}
                disabled={authLoading}
                className="w-full bg-[#3e3232] text-[#e5d8c8] py-3 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[18px] tracking-[1.8px] uppercase hover:bg-[#2a1f1f] transition-colors disabled:opacity-50"
              >
                {authLoading ? '...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation bar — folds when login form is open ────────── */}
      <div
        className="relative z-10 bg-[#e5d8c8] transition-all duration-[600ms] ease-in-out"
        style={{
          transformOrigin: 'top center',
          transform: isMenuOpen
            ? 'perspective(1200px) rotateX(0deg)'
            : 'perspective(1200px) rotateX(-5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="px-8 lg:px-16 py-4">
          <div className="flex items-end justify-center gap-6 lg:gap-12">

            <NavButton label="Browse"    icon={imgBooks}     active={activeScreen === 'browse'}    onClick={() => handleNavClick('browse')} />
            <NavButton label="Saved"     icon={imgBookmark}  active={activeScreen === 'saved'}     onClick={() => handleNavClick('saved')} />
            <NavButton label="Following" icon={imgFollowing}  active={activeScreen === 'following'} onClick={() => handleNavClick('following')} />
            <NavButton label="Extension" icon={imgOpenBook}  active={activeScreen === 'extension'} onClick={() => handleNavClick('extension')} />
            <NavButton label="About"     icon={imgAbout}     active={activeScreen === 'about'}     onClick={() => handleNavClick('about')} />

          </div>
        </div>
        <div className="h-[4px] bg-[#3e3232] mx-8" />
      </div>

    </div>
  );
}

// ── NavButton ─────────────────────────────────────────────────────────────────

function NavButton({ label, icon, active, onClick, iconSize }: { label: string; icon: string; active: boolean; onClick: () => void; iconSize?: string }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 relative">
      <img src={icon} alt="" className={`${iconSize ?? 'size-[30px] lg:size-[40px]'} object-contain`} />
      <span className="font-['Didot:Regular',sans-serif] text-[16px] lg:text-[24px] text-[#3e3232] tracking-[-1px] uppercase">
        {label}
      </span>
      {active && <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#3e3232]" />}
    </button>
  );
}
