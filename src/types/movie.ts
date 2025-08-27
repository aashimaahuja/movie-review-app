export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  director: string;
  poster: string;
  description: string;
  rating: number;
}

export interface Review {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
