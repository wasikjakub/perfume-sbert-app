import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import Home from './pages/Home';
import Families from './pages/Families';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#f6e9e6] min-h-screen">
        <Header />
        <main className="p-6 pb-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/families" element={<Families />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
