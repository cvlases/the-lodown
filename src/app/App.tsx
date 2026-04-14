import { useState } from 'react';
import BrowseScreen from './components/BrowseScreen';
import SavedScreen from './components/SavedScreen';
import FollowingScreen from './components/FollowingScreen';
import ExtensionScreen from './components/ExtensionScreen';
import Masthead from './components/Masthead';

type Screen = 'browse' | 'saved' | 'following' | 'extension';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('browse');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const handleNavClick = (screen: Screen) => {
    setFadeKey(prev => prev + 1);
    setTimeout(() => setActiveScreen(screen), 150);
  };

  return (
    <div className="flex flex-col h-screen bg-[#e5d8c8] overflow-hidden">
      <Masthead
        activeScreen={activeScreen}
        onNavClick={handleNavClick}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />

      <div
        key={fadeKey}
        className="flex-1 overflow-y-auto animate-[fadeIn_300ms_ease-in-out]"
      >
        {activeScreen === 'browse' && <BrowseScreen />}
        {activeScreen === 'saved' && <SavedScreen />}
        {activeScreen === 'following' && <FollowingScreen />}
        {activeScreen === 'extension' && <ExtensionScreen />}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
