import heroImg from '../assets/perfume_banner2.png';

export default function Hero() {
    return (
      <section className="mt-10 px-4">
        <div className="relative h-[650px] max-w-[70%] mx-auto rounded-xl overflow-hidden shadow-lg">
          {/* Obraz tła */}
          <img
            src={heroImg}
            alt="Perfume bottle"
            className="absolute inset-0 w-full h-full object-cover"
          />
  
          {/* Nakładka + tekst */}
          <div className="relative z-10 bg-black/40 w-full h-full flex flex-col justify-end items-start px-10 pb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Find your perfect scent
            </h1>
            <p className="text-white mb-6 max-w-xl text-xl">
              Tell us about your desired perfumes and we’ll recommend the best scent for you
            </p>
  
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
