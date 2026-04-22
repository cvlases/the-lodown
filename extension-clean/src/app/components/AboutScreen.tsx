// AboutScreen.tsx

export default function AboutScreen() {
  return (
    <div className="p-4 lg:p-8 max-w-2xl">

      {/* Header */}
      <div className="mb-10">
        <h2 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[36px] lg:text-[48px] text-[#3e3232] tracking-[5px] uppercase leading-none">
          About
        </h2>
        <div className="h-1.5 border-t-4 border-b-2 border-[#3e3232] mt-3" />
      </div>

      {/* Tagline */}
      <p className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[28px] lg:text-[38px] text-[#3e3232] tracking-[2px] uppercase leading-tight mb-8">
        Big news, closer to home.
      </p>

      {/* Core description */}
      <p className="font-['Didot:Regular',sans-serif] text-[18px] lg:text-[20px] text-[#3e3232] leading-relaxed mb-10">
        The LoDown finds local news coverage of the stories you're already reading. Browse any national news site and instantly see how reporters in your area are covering the same topic. Explore local papers by location and subject on our site.
      </p>

      {/* The Problem */}
      <div className="border-t-2 border-dashed border-[#3e3232] pt-8 mb-10">
        <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[3px] text-[#3e3232] uppercase mb-4">
          The Problem
        </p>
        <p className="font-['Didot:Italic',sans-serif] italic text-[17px] text-[#3e3232] leading-relaxed opacity-80">
          Media ownership is concentrated among a handful of large entities. Local newspapers have been sold to conglomerates, and the outlets that remain, often under-resourced, are doing some of the most important journalism in the country.
        </p>
      </div>

      {/* Read more link */}
      <a
        href="https://jkode.mmm.page/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full border-4 border-[#3e3232] bg-[#3e3232] text-[#e5d8c8] text-center py-5 px-6 font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[22px] lg:text-[28px] tracking-[3px] uppercase hover:bg-[#2a1f1f] transition-colors"
      >
        Read About It Here →
      </a>

    </div>
  );
}
