import { FaUser, FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-[#f6e9e6] px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      {/* LOGO - to be changed */}
      <div className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-1">
        <span role="img" aria-label="perfume">🧴</span>
        <span>
          perfu<span className="text-[#c4a075]">ME</span>
        </span>
      </div>

      {/* SEARCH + ICONS */}
      <div className="flex items-center gap-4">
        {/* SEARCH BAR – desktop only */}
        <div className="hidden md:flex items-center bg-white px-4 py-1.5 rounded-full shadow-inner w-[28rem]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-gray-700 flex-1 placeholder:text-gray-400"
          />
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-4 text-gray-600 text-lg">
          <FaHeart className="cursor-pointer hover:text-[#c4a075] transition" />
          <FaUser className="cursor-pointer hover:text-[#c4a075] transition" />
        </div>
      </div>
    </header>
  );
}
