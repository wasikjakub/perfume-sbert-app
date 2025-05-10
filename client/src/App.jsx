import Header from './components/shared/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="bg-[#f6e9e6] min-h-screen">
      <Header />
      <main className="p-6 pb-40">
        <Home />
      </main>
    </div>
  );
}

export default App;
