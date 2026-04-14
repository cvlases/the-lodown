import { useState } from 'react';

interface Filter {
  category: string;
  options: string[];
}

const FILTERS: Filter[] = [
  { category: 'LOCATION', options: ['pittsburgh', 'greater pa', 'minnesota'] },
  { category: 'TYPE', options: ['non-profit', 'independent', 'substack'] },
  { category: 'MEDIA', options: ['written', 'audio', 'video'] },
  { category: 'SOURCES', options: ['public source', 'kbzq'] },
  { category: 'AUTHORS', options: ['kayla ishibashi', 'hank herald'] },
];

const TOPICS = [
  { name: 'ice', active: true },
  { name: 'stormwater', active: true },
  { name: 'pittsburgh', active: true },
  { name: 'arts&Culture', active: false },
  { name: 'protest', active: true },
  { name: 'dogs', active: true },
  { name: 'politics', active: false },
  { name: 'farmers markets', active: false },
];

export default function FollowingScreen() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    LOCATION: 'pittsburgh',
    TYPE: 'non-profit',
    MEDIA: 'video',
  });

  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const toggleFilter = (category: string) => {
    setExpandedFilter(expandedFilter === category ? null : category);
  };

  const selectOption = (category: string, option: string) => {
    setActiveFilters(prev => ({ ...prev, [category]: option }));
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-[350px] bg-[#e5d8c8] border-4 border-[#3e3232] p-4">
          <h2 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[36px] lg:text-[48px] text-[#3e3232] text-center tracking-[4.8px] uppercase mb-6">
            FILTERS
          </h2>

          <div className="space-y-4">
            {FILTERS.map(filter => (
              <div key={filter.category} className="border-b-2 border-dashed border-[#3e3232] pb-3">
                <button
                  onClick={() => toggleFilter(filter.category)}
                  className="flex items-center justify-between w-full group"
                >
                  <h3 className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232] tracking-[2px] uppercase">
                    {filter.category}
                  </h3>
                  <span className="text-[16px] text-[#3e3232] transition-transform" style={{
                    transform: expandedFilter === filter.category ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▼
                  </span>
                </button>

                {expandedFilter === filter.category && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filter.options.map(option => {
                      const isActive = activeFilters[filter.category] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => selectOption(filter.category, option)}
                          className={`px-2 py-1 border border-[#3e3232] font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] lg:text-[14px] tracking-[1.4px] uppercase ${
                            isActive
                              ? 'bg-[#3e3232] text-[#e5d8c8]'
                              : 'bg-[#e5d8c8] text-[#3e3232]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Topics Section */}
            <div>
              <h3 className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232] tracking-[2px] uppercase mb-2">
                TOPICS
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(topic => (
                  <button
                    key={topic.name}
                    className={`px-2 py-1 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] lg:text-[14px] tracking-[1.4px] uppercase ${
                      topic.active
                        ? 'bg-[#3e3232] text-[#e5d8c8]'
                        : 'bg-[#e5d8c8] text-[#3e3232] border border-[#3e3232]'
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[16px] lg:text-[18px] text-[#3e3232] text-center tracking-[1.8px] uppercase pt-2">
              make adjustments
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#e5d8c8] border-4 border-[#3e3232] h-[200px] p-4 flex flex-col items-center justify-center"
              >
                <p className="font-['Heading_Now_Trial:44_Regular',sans-serif] text-[18px] lg:text-[24px] text-[#3e3232] text-center uppercase mb-4">
                  articles that come up based on the selected filters
                </p>
                <button className="bg-[#3e3232] text-[#e5d8c8] px-8 py-2 font-['Didot:Regular',sans-serif] text-[24px] lg:text-[32px] tracking-[-2px] uppercase hover:bg-[#2a1f1f] transition-colors">
                  Read
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Categories */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#e5d8c8] shadow-lg p-6 text-center border-2 border-[#3e3232]">
          <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[32px] lg:text-[40px] text-black tracking-[4px] uppercase mb-2">
            stories
          </h3>
          <div className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[14px] lg:text-[16px] text-black">
            <p className="mb-1">topics</p>
            <p>e.g. following stories about ice</p>
          </div>
        </div>

        <div className="bg-[#e5d8c8] shadow-lg p-6 text-center border-2 border-[#3e3232]">
          <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[32px] lg:text-[40px] text-black tracking-[4px] uppercase mb-2">
            authors
          </h3>
          <p className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[14px] lg:text-[16px] text-black">
            stories by these authors
          </p>
        </div>

        <div className="bg-[#e5d8c8] shadow-lg p-6 text-center border-2 border-[#3e3232]">
          <h3 className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[32px] lg:text-[40px] text-black tracking-[4px] uppercase mb-2">
            communities
          </h3>
          <p className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[14px] lg:text-[16px] text-black">
            other people can make collections of local stories and you can follow these??
          </p>
        </div>
      </div>
    </div>
  );
}
