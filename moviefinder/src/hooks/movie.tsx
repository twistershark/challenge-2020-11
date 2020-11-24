import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  isFavorite: boolean;
}

interface MovieProviderData {
  movies: Movie[];
  page: number;
  emptyMovies(): void;
  handleSetPage(): void;
  totalResults: number;
  favorites: Movie[];
  loading: boolean;
  findMovies(movieName: string): void;
  setFavorite(m: Movie): void;
}

const MovieContext = createContext<MovieProviderData>({} as MovieProviderData);

const MovieProvider: React.FC = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoritesID, setFavoritesID] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);

  const findMovies = useCallback(
    async movieName => {
      setLoading(true);

      const response = await api.get(
        `?apikey=925eba28&s=${movieName}&page=${page}`,
      );

      setTotalResults(response.data.totalResults);

      const newMovies = response.data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        isFavorite: false,
      }));

      setMovies([...movies, ...newMovies]);

      setLoading(false);
      setPage(page + 1);
    },
    [movies, page],
  );

  const setFavorite = useCallback((m: Movie) => {}, []);

  const handleSetPage = useCallback(() => {
    setPage(1);
  }, []);

  const emptyMovies = useCallback(() => {
    setMovies([]);
    setTotalResults(0);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        page,
        totalResults,
        loading,
        setFavorite,
        emptyMovies,
        handleSetPage,
        findMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

function useMovie(): MovieProviderData {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }

  return context;
}

export { useMovie, MovieProvider };
