import type { CartMovie } from '@/contexts/ShoppingCartContext';
import type { FavoriteMovie } from '@/contexts/FavoritesContext';

export const mockMovie: FavoriteMovie = {
  id: '1',
  title: 'Teste Movie',
  imageURL: 'https://example.com/image.jpg',
  price: '29.90',
  addedAt: new Date().toISOString(),
};

export const mockMovie2: FavoriteMovie = {
  id: '2',
  title: 'Teste Movie 2',
  imageURL: 'https://example.com/image2.jpg',
  price: '39.90',
  addedAt: new Date().toISOString(),
};

export const mockCartMovie: CartMovie = {
  id: '1',
  title: 'Teste Movie',
  imageURL: 'https://example.com/image.jpg',
  price: '29.90',
  addedAt: new Date().toISOString(),
};

export const mockCartMovie2: CartMovie = {
  id: '2',
  title: 'Teste Movie 2',
  imageURL: 'https://example.com/image2.jpg',
  price: '39.90',
  addedAt: new Date().toISOString(),
};

export const mockMovies: CartMovie[] = [
  {
    id: '1',
    title: 'Movie 1',
    price: '29.90',
    imageURL: 'https://example.com/image1.jpg',
    addedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Movie 2',
    price: '39.90',
    imageURL: 'https://example.com/image2.jpg',
    addedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Movie 3',
    price: '49.90',
    imageURL: 'https://example.com/image3.jpg',
    addedAt: new Date().toISOString(),
  },
];
