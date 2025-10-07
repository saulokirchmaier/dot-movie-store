import './App.css';
import MovieCard from './components/MovieCard';

function App() {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-blue-600">Dot Movies Store</h1>
      <p className="text-gray-600 mt-4">
        A loja de filmes está sendo configurada...
      </p>
      <div className="flex flex-wrap gap-6 justify-center">
        <MovieCard
          id="1"
          imageURL="/cover.jpg"
          title="Movie Title"
          genre="Ação"
          price="19.99"
          date="7 de janeiro, 2025"
          rating={8.5}
        />
        <MovieCard
          id="2"
          imageURL="/cover.jpg"
          title="Movie Title"
          genre="Ação"
          price="19.99"
          date="7 de janeiro, 2025"
          rating={8.5}
        />
        <MovieCard
          id="3"
          imageURL="/cover.jpg"
          title="Movie Title"
          genre="Comédia"
          price="19.99"
          date="7 de janeiro, 2025"
          rating={8.5}
        />
        <MovieCard
          id="4"
          imageURL="/cover.jpg"
          title="Movie Title"
          genre="Drama"
          price="19.99"
          date="7 de janeiro, 2025"
          rating={8.5}
        />
      </div>
    </div>
  );
}

export default App;
