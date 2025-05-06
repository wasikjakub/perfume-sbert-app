import quizImg from '../assets/QuizImage.png';

export default function QuizSection() {
  return (
    <section className="mt-16 px-4">
      <div className="relative max-w-5xl mx-auto bg-[#fdf5f2] rounded-xl shadow-md py-20 px-10 text-left overflow-hidden flex flex-col md:flex-row items-center min-h-[400px]">
        <div className="md:w-1/2 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Not sure what to choose?
          </h2>
          <p className="text-gray-600 text-2xl mb-8">
            Take our short quiz, tell us about your preferences and we will recommend a personalized scent just for you.
          </p>
          <button className="bg-[#c4a075] text-white font-semibold px-8 py-4 rounded-full text-3xl hover:bg-[#b18b60] transition">
            Start quiz
          </button>
        </div>

        <div className="md:w-1/2 h-full absolute top-0 right-0 hidden md:block">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(253, 245, 242, 1) 0%, rgba(253, 245, 242, 0.6) 20%, rgba(253, 245, 242, 0) 40%), url(${quizImg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center right',
            }}
          />
        </div>
      </div>
    </section>
  );
}
