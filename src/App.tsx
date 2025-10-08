import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mt-30 md:mt-20">
        <MovieList />
      </main>
    </div>
  );
}

export default App;
