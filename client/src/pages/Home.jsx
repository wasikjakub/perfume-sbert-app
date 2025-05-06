import Hero from '../components/Hero';
import QuizSection from '../components/QuizSection';
import WardrobeSection from '../components/WardrobeSection';

const Home = () => {
  return (
    <div className="space-y-7">
      <Hero />
      <QuizSection />
      <WardrobeSection/>
    </div>
  );
};

export default Home;
