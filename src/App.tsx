import './App.css';
import Header from './components/Header';
import MovieCard from './components/MovieCard';

function App() {
  return (
    <div>
      <Header />
      <div className="flex flex-wrap gap-6 justify-center w-full md:w-[90%] max-w-[1280px] mx-auto p-8">
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
