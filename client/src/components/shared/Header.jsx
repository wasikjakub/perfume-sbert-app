import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#f6e9e6] px-6 py-6 flex justify-between items-center shadow-sm sticky top-0 z-[50]">
      {/* LOGO - to be changed */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/logo_perfume.png"
            alt="perfuME logo"
            className="h-8 scale-[4.5] object-contain ml-[1cm]"
          />
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="flex items-center gap-8">
        <Link 
          to="/quiz" 
          className="text-gray-600 hover:text-[#c4a075] transition font-semibold text-lg"
        >
          Prompt Crafter
        </Link>
        <Link 
          to="/families" 
          className="text-gray-600 hover:text-[#c4a075] transition font-semibold text-lg"
        >
          Fragrance Families
        </Link>
      </div>
    </header>
  );
}
