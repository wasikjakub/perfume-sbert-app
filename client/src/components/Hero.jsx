import { useEffect, useState, useRef } from 'react';
import heroImg from '../assets/perfume_banner2.png';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(null); // Initialize as null

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

    // Set initial width based on 70% of parent container
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
          width: heroWidth || '70%', // Fallback to 70% if heroWidth isn't set yet
          left: scrolled ? `calc(50% - ${parseInt(heroWidth || '0') / 2}px)` : undefined,
        }}
      >
        <div className="px-10 pb-12 w-full">
          <h1
            className={`text-white font-bold mb-4 transition-all duration-500 ${
              scrolled ? 'text-3xl' : 'text-5xl'
            }`}
          >
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
              placeholder="Type here..."
              className="flex-1 px-4 py-4 rounded-l-md text-black outline-none text-xl"
            />
            <button className="bg-[#c4a075] text-white px-4 py-4 rounded-r-md font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>
      {scrolled && <div className="h-[260px]"></div>}
    </section>
  );
}