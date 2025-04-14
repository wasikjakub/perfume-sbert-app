import { useEffect, useState } from 'react';
import heroImg from '../assets/perfume_banner2.png';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="mt-10 px-4">
      <div
        className={`
          max-w-[70%] mx-auto shadow-lg rounded-xl
          transition-all duration-500 ease-in-out
          ${scrolled ? 'h-[260px]': 'h-[650px]'}
          flex flex-col justify-end
        `}
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
              Tell us about your desired perfumes and we’ll recommend the best scent for you
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
    </section>
  );
}
