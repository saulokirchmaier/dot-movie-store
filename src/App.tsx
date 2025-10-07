import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MovieList />
    </div>
  );
}

export default App;
