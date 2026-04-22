// BrowseScreen.tsx — find local news by location
//
// Sources: loaded from src/lib/sources.ts (local data file — add outlets there).
// Map: interactive Google Maps loaded via script tag (no npm package).

import { useEffect, useRef, useState } from 'react';
import { SOURCES } from '../../lib/sources';
import imgIcon         from "../../imports/Frame29/47a3d880227128c5049b103a786b70588a65d966.png";
import imgHousePin     from "../../imports/Frame29/0a9b7125739c11e461b234f4747afacef6394082.png";
import imgExternalLink from "../../imports/Frame29/3ee0f86e27fd4e13b1c060879edd61ce0246e430.png";

const MAP_STYLE = [
  { featureType: 'administrative',          elementType: 'labels.text.fill',   stylers: [{ color: '#444444' }] },
  { featureType: 'administrative.country',  elementType: 'geometry.stroke',    stylers: [{ visibility: 'on' }, { weight: '1.17' }] },
  { featureType: 'administrative.country',  elementType: 'labels.text',        stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text',        stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape',               elementType: 'all',                stylers: [{ color: '#f2f2f2' }] },
  { featureType: 'poi',                     elementType: 'all',                stylers: [{ visibility: 'off' }] },
  { featureType: 'road',                    elementType: 'all',                stylers: [{ saturation: -100 }, { lightness: 45 }] },
  { featureType: 'road.highway',            elementType: 'all',                stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.arterial',           elementType: 'labels.icon',        stylers: [{ visibility: 'off' }] },
  { featureType: 'transit',                 elementType: 'all',                stylers: [{ visibility: 'off' }] },
  { featureType: 'water',                   elementType: 'all',                stylers: [{ color: '#c2a26e' }, { visibility: 'on' }] },
];

const PITTSBURGH_CENTER = { lat: 40.4406, lng: -79.9959 };
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string;

// Coordinates geocoded from physical addresses via Nominatim
const SOURCE_COORDS: Record<string, { lat: number; lng: number }> = {
  'publicsource':               { lat: 40.4379, lng: -79.9779 }, // 1936 Fifth Ave
  'next-pittsburgh':            { lat: 40.4399, lng: -80.0022 }, // 223 Fourth Ave
  'triblive':                   { lat: 40.6005, lng: -79.7542 }, // 210 Wood St, Tarentum
  'wesa':                       { lat: 40.4299, lng: -79.9867 }, // 67 Bedford Square
  'pittsburgh-union-progress':  { lat: 40.4406, lng: -79.9959 }, // no address — city center
  'pittsburgh-post-gazette':    { lat: 40.4458, lng: -80.0121 }, // 358 North Shore Dr
};


interface Props { onSubmitClick: () => void; }

export default function BrowseScreen({ onSubmitClick }: Props) {
  const [location, setLocation]   = useState('Pittsburgh, PA');
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const mapDivRef  = useRef<HTMLDivElement>(null);
  const mapRef     = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [mapReady, setMapReady] = useState(false);

  function initMap() {
    const G = (window as any).google?.maps;
    if (!G || !mapDivRef.current || mapRef.current) return;
    mapRef.current = new G.Map(mapDivRef.current, {
      center: PITTSBURGH_CENTER,
      zoom: 13,
      styles: MAP_STYLE,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'cooperative',
    });
    setMapReady(true);
  }

  // Load (or reuse) Google Maps script
  useEffect(() => {
    if ((window as any).google?.maps) {
      initMap();
      return;
    }

    const existing = document.querySelector('#google-maps-script') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', initMap);
      return () => existing.removeEventListener('load', initMap);
    }

    const script = document.createElement('script');
    script.id    = 'google-maps-script';
    script.src   = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&loading=async`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', initMap);
    document.head.appendChild(script);
    return () => script.removeEventListener('load', initMap);
  }, []);

  // Add markers once the map is ready
  useEffect(() => {
    if (!mapReady) return;
    const G = (window as any).google?.maps;
    if (!G || !mapRef.current) return;

    SOURCES.forEach(source => {
      const coords = SOURCE_COORDS[source.id];
      if (!coords || markersRef.current[source.id]) return;

      const marker = new G.Marker({
        position: coords,
        map: mapRef.current,
        title: source.name,
        icon: makeMarkerIcon(false),
      });
      markersRef.current[source.id] = marker;

      const infoWindow = new G.InfoWindow();
      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="font-family:serif;color:#3e3232;padding:4px 2px;min-width:150px;">
            <strong style="font-size:13px;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px;">${source.name}</strong>
            <a href="${source.url}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#3e3232;text-decoration:underline;">Visit site →</a>
          </div>
        `);
        infoWindow.open(mapRef.current, marker);
        setHoveredSource(source.id);
      });
    });
  }, [mapReady]);

  // Sync marker highlight with hovered source
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      marker.setIcon(makeMarkerIcon(id === hoveredSource));
    });
  }, [hoveredSource]);

  return (
    <div className="p-4 lg:p-8">

      {/* Location search bar */}
      <div className="mb-6 border-4 border-[#3e3232] h-[120px] flex items-center px-4 lg:px-8 relative">
        <img src={imgIcon} alt="" className="size-[40px] object-contain mr-4" />
        <p className="font-['Didot:Regular',sans-serif] text-[20px] lg:text-[28px] text-black mr-2 whitespace-nowrap">
          I'm looking for news near:
        </p>
        {isEditing ? (
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={e => e.key === 'Enter' && setIsEditing(false)}
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

      {/* Map + directory */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Interactive Google Map */}
        <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-[500px] border-4 border-[#3e3232] overflow-hidden">
          <div ref={mapDivRef} className="w-full h-full" />
        </div>

        {/* Outlet directory */}
        <div className="flex-1 border-4 border-[#3e3232] overflow-y-auto max-h-[600px]">

          {/* Header */}
          <div className="px-5 py-4 border-b-4 border-[#3e3232] bg-[#3e3232]">
            <p className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[13px] tracking-[3px] text-[#e5d8c8] uppercase">
              LOCAL OUTLETS · {location}
            </p>
          </div>

          <div>
            {SOURCES.map((source, i) => (
              <div
                key={source.id}
                className="flex items-center justify-between px-5 py-4 cursor-pointer transition-colors border-b border-[#3e3232]/20 last:border-b-0"
                style={{ backgroundColor: hoveredSource === source.id ? 'rgba(62,50,50,0.08)' : 'transparent' }}
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
              >
                <div className="flex items-center gap-3 flex-wrap flex-1 mr-4">
                  <span className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232]/40 w-5 text-right flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-['Heading_Now_Trial:35_Medium',sans-serif] text-[18px] lg:text-[22px] text-[#3e3232] uppercase">
                        {source.name}
                      </h4>
                      {source.nonprofit && (
                        <div className="border border-[#3e3232] px-2 py-0.5">
                          <span className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[10px] lg:text-[11px] text-[#3e3232] tracking-[1.4px] uppercase">
                            Non-profit
                          </span>
                        </div>
                      )}
                    </div>
                    {source.address && (
                      <p className="font-['Didot:Italic',sans-serif] italic text-[12px] text-[#3e3232] opacity-50 mt-0.5">
                        {source.address}
                      </p>
                    )}
                  </div>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 flex-shrink-0 group"
                  onClick={e => e.stopPropagation()}
                >
                  <span className="font-['Heading_Now_Trial:56_Bold',sans-serif] text-[12px] lg:text-[14px] text-[#3e3232] uppercase group-hover:underline">
                    VISIT
                  </span>
                  <img src={imgExternalLink} alt="" className="size-[16px] object-contain" />
                </a>
              </div>
            ))}
          </div>

          {/* Submit link */}
          <div className="px-5 py-5 border-t-2 border-dashed border-[#3e3232] mt-0">
            <button
              onClick={onSubmitClick}
              className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] underline hover:no-underline"
            >
              Is your outlet missing from The LoDown? Submit for review →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function makeMarkerIcon(hovered: boolean) {
  return {
    path: 'M -8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0',
    fillColor:   hovered ? '#e5d8c8' : '#3e3232',
    fillOpacity: 1,
    strokeColor: '#3e3232',
    strokeWeight: 2.5,
    scale: hovered ? 1.5 : 1,
  };
}
