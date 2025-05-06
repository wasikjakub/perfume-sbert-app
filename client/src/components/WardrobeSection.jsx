import wardrobeImg from '../assets/WardrobeImage.png';

export default function PerfumeWardrobeSectionMirrored() {
  return (
    <section className="mt-16 px-4">
      <div className="relative max-w-5xl mx-auto bg-[#fdf5f2] rounded-xl shadow-md py-20 px-10 overflow-hidden flex flex-col md:flex-row items-center min-h-[400px]">
        
        {/* Obrazek po lewej */}
        <div className="md:w-1/2 h-full absolute top-0 left-0 hidden md:block">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to left, rgba(253, 245, 242, 1) 0%, rgba(253, 245, 242, 0.6) 20%, rgba(253, 245, 242, 0) 40%), url(${wardrobeImg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center left',
            }}
          />
        </div>

        {/* Tekst po prawej, wyrównany do prawej */}
        <div className="md:ml-auto md:w-1/2 z-10 text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Perfume wardrobe
          </h2>
          <p className="text-gray-600 text-2xl mb-8">
            Curated collections of perfumes for every mood and occasion
          </p>
          <button className="bg-[#c4a075] text-white font-semibold px-8 py-4 rounded-full text-3xl hover:bg-[#b18b60] transition">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}
