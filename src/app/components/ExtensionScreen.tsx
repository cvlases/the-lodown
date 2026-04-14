import { useState } from 'react';
import imgArticle from "../../imports/Following/cc6539111460f95d579b9ffcae4d5b705b150acb.png";

export default function ExtensionScreen() {
  const [bookmarked, setBookmarked] = useState([false, false]);
  const [favorited, setFavorited] = useState([false, false]);

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="font-['Didot:Regular',sans-serif] text-[32px] lg:text-[56px] text-[#3e3232] mb-4">
            Local News, When You Need It
          </h2>
          <p className="font-['Didot:Italic',sans-serif] italic text-[18px] lg:text-[28px] text-[#3e3232] max-w-[800px] mx-auto">
            Introducing a browser companion that quietly suggests local coverage as you read national news
          </p>
        </div>

        <div className="h-[4px] bg-[#3e3232] mb-8" />

        {/* Installation Section */}
        <div className="text-center mb-8">
          <h3 className="font-['Didot:Regular',sans-serif] text-[32px] lg:text-[56px] text-[#3e3232] mb-6">
            Already Have The LoDown?
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#3e3232] text-[#e5d8c8] px-6 py-3 rounded-lg font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] hover:bg-[#2a1f1f] transition-colors flex items-center justify-center gap-3">
              <ChromeIcon />
              add to Chrome
            </button>
            <button className="bg-[#3e3232] text-[#e5d8c8] px-6 py-3 rounded-lg font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] hover:bg-[#2a1f1f] transition-colors">
              manual download
            </button>
          </div>
        </div>

        <div className="h-[4px] bg-[#3e3232] mb-8" />

        {/* Example Articles Section */}
        <div>
          <h3 className="font-['Didot:Regular',sans-serif] text-[24px] lg:text-[32px] text-[#3e3232] text-center mb-6 uppercase">
            BOOKMARKS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ArticleCard
              image={imgArticle}
              title="article name"
              bookmarked={bookmarked[0]}
              favorited={favorited[0]}
              onBookmark={() => setBookmarked(prev => [!prev[0], prev[1]])}
              onFavorite={() => setFavorited(prev => [!prev[0], prev[1]])}
            />
            <ArticleCard
              image={imgArticle}
              title="article name"
              bookmarked={bookmarked[1]}
              favorited={favorited[1]}
              onBookmark={() => setBookmarked(prev => [prev[0], !prev[1]])}
              onFavorite={() => setFavorited(prev => [prev[0], !prev[1]])}
            />
          </div>

          <h3 className="font-['Didot:Regular',sans-serif] text-[24px] lg:text-[32px] text-[#3e3232] text-center mb-6 uppercase">
            FAVORITES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArticleCard
              image={imgArticle}
              title="article name"
              bookmarked={false}
              favorited={true}
              onBookmark={() => {}}
              onFavorite={() => {}}
            />
            <ArticleCard
              image={imgArticle}
              title="article name"
              bookmarked={true}
              favorited={false}
              onBookmark={() => {}}
              onFavorite={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ArticleCardProps {
  image: string;
  title: string;
  bookmarked: boolean;
  favorited: boolean;
  onBookmark: () => void;
  onFavorite: () => void;
}

function ArticleCard({ image, title, bookmarked, favorited, onBookmark, onFavorite }: ArticleCardProps) {
  return (
    <div className="bg-[#e5d8c8] border-4 border-[#3e3232] overflow-hidden">
      <p className="font-['Didot:Italic',sans-serif] italic text-[20px] lg:text-[28px] text-[#3e3232] text-center py-3">
        {title}
      </p>
      <div className="h-[250px] lg:h-[300px] px-6 lg:px-8">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-between p-3 bg-[#e5d8c8]">
        <button className="bg-[#3e3232] text-[#e5d8c8] px-8 py-2 font-['Didot:Regular',sans-serif] text-[24px] lg:text-[32px] tracking-[-2px] uppercase hover:bg-[#2a1f1f] transition-colors">
          Read
        </button>
        <div className="flex gap-2">
          <button
            onClick={onBookmark}
            className={`size-[40px] lg:size-[50px] flex items-center justify-center transition-colors ${
              bookmarked ? 'bg-[#FE7200]' : 'bg-[#3e3232]'
            }`}
          >
            <BookmarkIcon />
          </button>
          <button
            onClick={onFavorite}
            className={`size-[40px] lg:size-[50px] flex items-center justify-center transition-colors ${
              favorited ? 'bg-[#FE7200]' : 'bg-[#3e3232]'
            }`}
          >
            <HeartIcon />
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

function BookmarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 39" fill="none">
      <path
        d="M6.66667 0V39L20 29.25L33.3333 39V0H6.66667Z"
        fill="#E5D8C8"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 33L15.45 30.6C6.6 22.5 0 16.5 0 9C0 3 4.5 0 9 0C12 0 15 1.5 18 4.5C21 1.5 24 0 27 0C31.5 0 36 3 36 9C36 16.5 29.4 22.5 20.55 30.6L18 33Z"
        fill="#E5D8C8"
      />
    </svg>
  );
}
