import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import BrowseScreen       from './components/BrowseScreen';
import SavedScreen        from './components/SavedScreen';
import FollowingScreen    from './components/FollowingScreen';
import ExtensionScreen    from './components/ExtensionScreen';
import AboutScreen        from './components/AboutScreen';
import SubmitSourceScreen from './components/SubmitSourceScreen';
import Masthead           from './components/Masthead';

type Screen = 'browse' | 'saved' | 'following' | 'extension' | 'about' | 'submit';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('browse');
  const [isLoginOpen, setIsLoginOpen]   = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser]                 = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setIsLoginOpen(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleNavClick = (screen: Screen) => {
    if ((screen === 'following' || screen === 'saved') && !user) {
      setIsLoginOpen(true);
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setIsTransitioning(false);
    }, 150);
  };

  // Submit screen: standalone full page, no masthead
  if (activeScreen === 'submit') {
    return (
      <div className="min-h-screen bg-[#e5d8c8] overflow-y-auto">
        <SubmitSourceScreen onBack={() => handleNavClick('browse')} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#e5d8c8] overflow-hidden">
      <Masthead
        activeScreen={activeScreen}
        onNavClick={handleNavClick}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        user={user}
      />

      <div
        className="flex-1 overflow-y-auto"
        style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 150ms ease-in-out' }}
      >
        {activeScreen === 'browse'    && <BrowseScreen onSubmitClick={() => handleNavClick('submit')} />}
        {activeScreen === 'saved'     && <SavedScreen user={user} />}
        {activeScreen === 'following' && <FollowingScreen user={user} />}
        {activeScreen === 'extension' && <ExtensionScreen onBrowseClick={() => handleNavClick('browse')} />}
        {activeScreen === 'about'     && <AboutScreen />}
      </div>
    </div>
  );
}
