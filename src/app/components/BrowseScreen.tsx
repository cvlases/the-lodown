import { useState } from 'react';
import imgIcon from "../../imports/Frame29/47a3d880227128c5049b103a786b70588a65d966.png";
import imgHousePin from "../../imports/Frame29/0a9b7125739c11e461b234f4747afacef6394082.png";
import imgMapPin from "../../imports/Frame29/3c5a619fd59251b542a76826ae17ed480ad38149.png";
import imgMap from "../../imports/Frame29/06ac4b72e9481ec1db45b6f5c9a98f63238ce534.png";
import imgExternalLink from "../../imports/Frame29/3ee0f86e27fd4e13b1c060879edd61ce0246e430.png";

const PITTSBURGH_OUTLETS = [
  { name: 'PUBLIC SOURCE', type: ['Independent', 'Non-profit'], url: 'https://www.publicsource.org', section: 'nearby' },
  { name: 'WESA 90.5', type: ['Non-profit'], url: 'https://www.wesa.fm', section: 'nearby' },
  { name: 'PITTSBURGH CITY PAPER', type: ['Independent'], url: 'https://www.pghcitypaper.com', section: 'county' },
  { name: 'PITTSBURGH POST-GAZETTE', type: [], url: 'https://www.post-gazette.com', section: 'county' },
  { name: 'THE INCLINE', type: ['Independent'], url: 'https://theincline.com', section: 'state' },
  { name: 'PITTSBURGH CURRENT', type: ['Independent'], url: 'https://www.pittsburghcurrent.com', section: 'state' },
];

export default function BrowseScreen() {
  const [location, setLocation] = useState('Pittsburgh, PA');
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredOutlet, setHoveredOutlet] = useState<string | null>(null);

  const nearbyOutlets = PITTSBURGH_OUTLETS.filter(o => o.section === 'nearby');
  const countyOutlets = PITTSBURGH_OUTLETS.filter(o => o.section === 'county');
  const stateOutlets = PITTSBURGH_OUTLETS.filter(o => o.section === 'state');

  return (
    <div className="p-4 lg:p-8">
      {/* Location Search Bar */}
      <div className="mb-6 border-4 border-[#3e3232] h-[120px] flex items-center px-4 lg:px-8 relative">
        <img src={imgIcon} alt="" className="size-[40px] object-contain mr-4" />
        <p className="font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] text-black mr-2">
          I'm looking for news near:
        </p>
        {isEditing ? (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            autoFocus
            className="font-['Didot:Italic',sans-serif] italic text-[24px] lg:text-[32px] text-[#3e3232] underline bg-transparent border-none outline-none flex-1"
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="font-['Didot:Italic',sans-serif] italic text-[24px] lg:text-[32px] text-[#3e3232] underline hover:no-underline flex-1 text-left"
          >
            {location}
          </button>
        )}
        <img src={imgHousePin} alt="" className="absolute right-4 w-[80px] h-[100px] lg:w-[120px] lg:h-[150px] object-contain" />
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Panel */}
        <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-[500px] relative border-4 border-[#3e3232]">
          <img src={imgMap} alt="Map" className="absolute inset-0 w-full h-full object-cover" />
          <img src={imgMapPin} alt="" className="absolute left-[30%] top-[25%] size-[40px]" />
          <img src={imgMapPin} alt="" className="absolute left-[20%] top-[60%] size-[40px]" />
          <img src={imgMapPin} alt="" className="absolute left-[50%] top-[45%] size-[40px]" />
          <img src={imgIcon} alt="" className="absolute right-[15%] bottom-[35%] size-[40px]" />

          <button className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-[#e5d8c8] border border-[#3e3232] px-4 py-2 font-['Heading_Now_Trial:35_Medium',sans-serif] text-[16px] lg:text-[20px] text-[#3e3232] tracking-[2px] uppercase hover:bg-[#d4c5b5] transition-colors">
            SEARCH MAP REGION
          </button>
        </div>

        {/* Outlet Directory */}
        <div className="flex-1 border-4 border-[#3e3232] p-4 lg:p-8 overflow-y-auto max-h-[600px]">
          {/* Nearby Section */}
          <div className="mb-6">
            <h3 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[32px] lg:text-[40px] text-[#3e3232] tracking-[3px] uppercase underline mb-3">
              NEARBY
            </h3>
            <div className="space-y-2">
              {nearbyOutlets.map((outlet, idx) => (
                <OutletRow
                  key={idx}
                  outlet={outlet}
                  isHovered={hoveredOutlet === outlet.name}
                  onHover={setHoveredOutlet}
                />
              ))}
            </div>
          </div>

          {/* County Section */}
          <div className="mb-6">
            <h3 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[32px] lg:text-[40px] text-[#3e3232] tracking-[3px] uppercase underline mb-3">
              COUNTY
            </h3>
            <div className="space-y-2">
              {countyOutlets.map((outlet, idx) => (
                <OutletRow
                  key={idx}
                  outlet={outlet}
                  isHovered={hoveredOutlet === outlet.name}
                  onHover={setHoveredOutlet}
                />
              ))}
            </div>
          </div>

          {/* State Section */}
          <div>
            <h3 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[32px] lg:text-[40px] text-[#3e3232] tracking-[3px] uppercase underline mb-3">
              STATE
            </h3>
            <div className="space-y-2">
              {stateOutlets.map((outlet, idx) => (
                <OutletRow
                  key={idx}
                  outlet={outlet}
                  isHovered={hoveredOutlet === outlet.name}
                  onHover={setHoveredOutlet}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OutletRowProps {
  outlet: {
    name: string;
    type: string[];
    url: string;
  };
  isHovered: boolean;
  onHover: (name: string | null) => void;
}

function OutletRow({ outlet, isHovered, onHover }: OutletRowProps) {
  return (
    <div
      className="relative min-h-[50px] flex items-center justify-between px-3 py-2 cursor-pointer transition-colors"
      style={{ backgroundColor: isHovered ? 'rgba(62, 50, 50, 0.1)' : 'transparent' }}
      onMouseEnter={() => onHover(outlet.name)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2 flex-wrap flex-1 mr-4">
        <h4 className="font-['Heading_Now_Trial:35_Medium',sans-serif] text-[20px] lg:text-[28px] text-[#3e3232] uppercase">
          {outlet.name}
        </h4>
        {outlet.type.map((badge, idx) => (
          <div
            key={idx}
            className="border border-[#3e3232] px-2 py-0.5"
          >
            <span className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] lg:text-[14px] text-[#3e3232] tracking-[1.4px] uppercase whitespace-nowrap">
              {badge}
            </span>
          </div>
        ))}
      </div>

      <a
        href={outlet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 group flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-['Heading_Now_Trial:66_Bold',sans-serif] text-[16px] lg:text-[20px] text-[#3e3232] uppercase">
          VISIT
        </span>
        <img src={imgExternalLink} alt="" className="size-[24px] object-contain" />
      </a>
    </div>
  );
}
