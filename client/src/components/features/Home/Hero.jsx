import { useState, useEffect } from "react";
import { useRecommendations } from "../../../hooks/useRecommendations";
import RecommendationTile from "../../shared/RecommendationTile";
import heroImg from "../../../assets/perfume_banner2.png";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const {
    prompt,
    setPrompt,
    recommendations,
    loading,
    freshSearch,
    handleSearch,
    clearRecommendations,
  } = useRecommendations();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHeroClick = () => {
    if (scrolled) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mt-10 px-4">
      <div className="relative">
        <div
          className={`
            mx-auto shadow-lg rounded-xl
            transition-all duration-500 ease-in-out
            ${
              scrolled
                ? "h-[260px] fixed top-0 z-20 cursor-pointer w-full md:w-[90%] lg:w-[70%]"
                : "h-[calc(100vh-2rem)] max-h-[650px] w-full md:w-[90%] lg:w-[70%]"
            }
            flex flex-col justify-end
            left-0 right-0
          `}
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleHeroClick}
        >
          <div className="px-6 md:px-10 pb-12 w-full flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10">
            {/* Left Column */}
            <div className="w-full lg:w-[60%]">
              <h1
                className={`text-white font-bold mb-4 transition-all duration-500 ${
                  scrolled ? "text-3xl" : "text-5xl"
                }`}
              >
                Find your perfect scent
              </h1>
              {!scrolled && (
                <p className="text-white mb-6 max-w-xl text-xl transition-opacity duration-300">
                  Tell us about your desired perfumes and we'll recommend the
                  best scent for you
                  <span className="relative group inline-block align-baseline ml-1 cursor-pointer">
                    <span className="inline-block w-5 h-5 rounded-full bg-[#c4a075] text-white text-xs font-bold text-center leading-5">
                      ?
                    </span>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-[260px] bg-white text-black text-sm rounded-md shadow-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 text-center">
                      Describe any scent you can imagine in your words, for example:
                      "I want vanilla perfumes with wooden notes for women". If you need inspiration - check out Fragrance Families
                    </span>
                  </span>
                </p>
              )}
              <div className="flex w-full max-w-full mt-4 gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Type here..."
                  className="flex-1 px-4 py-4 rounded-md text-black outline-none text-xl min-w-[250px]"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#c4a075] text-white px-6 py-4 rounded-md font-semibold"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {/* Right Column */}
            {recommendations.length > 0 && (
              <div className="w-full lg:w-[27rem] flex flex-col relative">
                <button
                  onClick={clearRecommendations}
                  className="absolute top-0 right-0 text-white text-2xl font-bold p-1"
                  aria-label="Clear recommendations"
                >
                  ✕
                </button>
                {!scrolled && (
                  <h2 className="font-bold mb-4 text-white text-3xl">
                    Recommendations
                  </h2>
                )}
                <div
                  className={`overflow-y-auto pr-2 space-y-4 scrollbar-thin transition-all duration-300`}
                  style={{
                    maxHeight: scrolled ? "200px" : "400px",
                    paddingTop: scrolled ? "5rem" : "0",
                  }}
                >
                  {recommendations.map((perfume, index) => (
                    <RecommendationTile
                      key={index}
                      perfume={perfume}
                      index={index}
                      freshSearch={freshSearch}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[260px]"></div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .recommendation-tile:hover strong {
            color: rgb(87, 66, 38);
          }

          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-track {
            background-color: transparent;
          }

          .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
          }
        `}
      </style>
    </section>
  );
}
