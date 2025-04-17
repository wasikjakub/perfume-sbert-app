import { useState, useEffect, useRef } from 'react';
import heroImg from '../assets/perfume_banner2.png';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  
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

  return (
    <section className="mt-10 px-4">
      <div
        ref={heroRef}
        className={`
          mx-auto shadow-lg rounded-xl
          transition-all duration-500 ease-in-out
          ${scrolled ? 'h-[260px] fixed top-0' : 'h-[650px]'}
          flex flex-col justify-end
        `}
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: heroWidth || '70%',
          left: scrolled ? `calc(50% - ${parseInt(heroWidth || '0') / 2}px)` : undefined,
        }}
      >
        <div className="px-10 pb-12 w-full">
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
              placeholder="Type here..."
              className="flex-1 px-4 py-4 rounded-l-md text-black outline-none text-xl"
            />
            <button
              onClick={handleSearch}
              className="bg-[#c4a075] text-white px-4 py-4 rounded-r-md font-semibold"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
      {scrolled && <div className="h-[260px]"></div>}

      {recommendations.length > 0 && (
        <div className="mt-10 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <ul className="space-y-4">
          {recommendations.map((perfume, index) => (
            <li key={index} className="p-4 bg-white rounded shadow">
              <string>{perfume.Name} by {perfume.Designer} </string>
              <p className="text-gray-700 inline">{perfume.description}</p>
              <a
                href={perfume.URL}  // Assuming perfume.URL contains the URL
                target="_blank"     // Open in a new tab
                rel="noopener noreferrer"  // For security
                className="text-blue-500 hover:underline"
              >
                 💡 more
              </a>
            </li>
          ))}
          </ul>
        </div>
      )}
    </section>
  );
}