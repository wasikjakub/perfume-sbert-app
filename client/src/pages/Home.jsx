import Hero from '../components/Hero';
import QuizSection from '../components/QuizSection';

const Home = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <QuizSection />
      <QuizSection />
      <QuizSection />
      {/* możesz tu dodać kolejne sekcje jak: Testimonials, NewsletterSignup, Footer */}
    </div>
  );
};

export default Home;
