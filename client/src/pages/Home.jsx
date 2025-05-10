import Hero from '../components/features/Home/Hero';
import QuizSection from '../components/features/Home/QuizSection';
import WardrobeSection from '../components/features/Home/WardrobeSection';
import NotesSection from '../components/features/Home/NotesSection'

const Home = () => {
  return (
    <div className="space-y-7">
      <Hero />
      <QuizSection />
      <WardrobeSection />
      <NotesSection />
    </div>
  );
};

export default Home;
