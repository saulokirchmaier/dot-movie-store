import { createFileRoute } from '@tanstack/react-router';
import { Layout } from '@/components/Layout';
import MovieList from '@/components/MovieList';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <Layout>
      <MovieList />
    </Layout>
  );
}
