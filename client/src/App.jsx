import Header from './components/Header';
import Home from './pages/Home'; // zakładam, że tam trzymasz Home

function App() {
  return (
    <div className="bg-[#f6e9e6] min-h-screen">
      <Header />
      <main className="p-6">
        <Home />
      </main>
    </div>
  );
}

export default App;
