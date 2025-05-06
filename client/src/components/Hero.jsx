import { useState, useEffect, useRef } from 'react';
import heroImg from '../assets/perfume_banner2.png';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [freshSearch, setFreshSearch] = useState(false);
  
  const heroRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const updateWidth = () => {
      if (heroRef.current) {
        const width = heroRef.current.getBoundingClientRect().width;
        setHeroWidth(`${width}px`);
      }
    };

    const setInitialWidth = () => {
      if (heroRef.current) {
        const parentWidth = heroRef.current.parentElement.offsetWidth;
        const initialWidth = parentWidth * 0.7; // 70% of parent width
        setHeroWidth(`${initialWidth}px`);
      }
    };

    setInitialWidth();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleSearch = async () => {
    if (!prompt) return;
    setLoading(true);
    setRecommendations([]); // Clear previous recommendations
    setFreshSearch(true); // Mark as fresh search for animation

    try {
      const res = await fetch('http://127.0.0.1:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log('Data received:', data);
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
    setFreshSearch(false);
  };

  const handleHeroClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-10 px-4">
      <div className="relative">
        <div
          ref={heroRef}
          className={`
            mx-auto shadow-lg rounded-xl
            transition-all duration-500 ease-in-out
            ${scrolled ? 'h-[260px] fixed top-0 z-20 cursor-pointer' : 'h-[650px]'}
            flex flex-col justify-end
          `}
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: heroWidth || '70%',
            left: scrolled ? `calc(50% - ${parseInt(heroWidth || '0') / 2}px)` : undefined,
          }}
          onClick={handleHeroClick}
        >
          <div className="px-10 pb-12 w-full flex items-end">
            <div className="flex-1">
              <h1 className={`text-white font-bold mb-4 transition-all duration-500 ${scrolled ? 'text-3xl' : 'text-5xl'}`}>
                Find your perfect scent
              </h1>
              {!scrolled && (
                <p className="text-white mb-6 max-w-xl text-xl transition-opacity duration-300">
                  Tell us about your desired perfumes and we'll recommend the best scent for you
                </p>
              )}
              <div className="flex w-full max-w-[45rem]">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="Type here..."
                  className="w-[36rem] px-4 py-4 rounded-l-md text-black outline-none text-2xl"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#c4a075] text-white px-4 py-4 rounded-r-md font-semibold"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
            {recommendations.length > 0 && (
              <div className="w-[27rem] ml-16 flex flex-col mt-8 mr-8 relative">
                <button
                  onClick={clearRecommendations}
                  className="absolute top-0 right-0 text-white text-2xl font-bold p-1"
                  aria-label="Clear recommendations"
                >
                  ✕
                </button>
                <h2 className="font-bold mb-10 text-white text-3xl">
                  Recommendations
                </h2>
                <ul className="flex flex-col space-y-4">
                  {recommendations.map((perfume, index) => (
                    <a
                      key={index}
                      href={perfume.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg shadow hover:bg-[rgba(255,255,255,0.9)] transition-colors recommendation-tile"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        animation: freshSearch ? `fadeIn 0.5s ease-in ${index * 0.3}s forwards` : 'none',
                        opacity: freshSearch ? 0 : 1,
                      }}
                    >
                      <strong className="text-xl text-[#1D0200]">{perfume.Name} by {perfume.Designer}</strong>
                    </a>
                  ))}
                </ul>
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
            color: #c4a075;
          }
        `}
      </style>
    </section>
  );
}