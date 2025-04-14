export default function QuizSection() {
    return (
      <section className="mt-16 px-4">
        <div className="max-w-4xl mx-auto bg-[#fdf5f2] rounded-xl shadow-md py-16 px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Not sure what to choose?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Take our short quiz and discover the perfect scent just for you.
          </p>
          <button className="bg-[#c4a075] text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-[#b18b60] transition">
            Start quiz
          </button>
        </div>
      </section>
    );
  }
  