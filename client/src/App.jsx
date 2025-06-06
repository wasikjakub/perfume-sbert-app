import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import Home from './pages/Home';
import Families from './pages/Families';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#f6e9e6] min-h-screen">
        <Header />
        <main className="p-6 pb-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/families" element={<Families />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
