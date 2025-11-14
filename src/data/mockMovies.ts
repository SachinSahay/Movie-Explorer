import { Movie, Genre, MovieDetails } from '@/types/movie';

export const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime with the help of Lieutenant Jim Gordon and District Attorney Harvey Dent.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 29000,
    genre_ids: [28, 80, 18],
    popularity: 95.8
  },
  {
    id: 2,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 25000,
    genre_ids: [80, 18],
    popularity: 88.2
  },
  {
    id: 3,
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 32000,
    genre_ids: [28, 878, 53],
    popularity: 92.5
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-23",
    vote_average: 9.3,
    vote_count: 28000,
    genre_ids: [18, 80],
    popularity: 89.7
  },
  {
    id: 5,
    title: "Interstellar",
    overview: "Earth's future has been riddled by disasters, famines, and droughts. A team of explorers travel through a wormhole in space.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 31000,
    genre_ids: [18, 878],
    popularity: 94.1
  },
  {
    id: 6,
    title: "The Matrix",
    overview: "A computer programmer discovers that reality as he knows it is actually a simulation controlled by machines.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-31",
    vote_average: 8.7,
    vote_count: 23000,
    genre_ids: [28, 878],
    popularity: 87.3
  },
  {
    id: 7,
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and fellow gangsters.",
    poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdrop_path: "/sw7mordbZxgITU877yTpZCud90M.jpg",
    release_date: "1990-09-21",
    vote_average: 8.7,
    vote_count: 12000,
    genre_ids: [18, 80],
    popularity: 82.1
  },
  {
    id: 8,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-24",
    vote_average: 9.2,
    vote_count: 18000,
    genre_ids: [18, 80],
    popularity: 91.4
  }
];

export const featuredMovie: MovieDetails = {
  ...mockMovies[0],
  genres: [
    { id: 28, name: "Action" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" }
  ],
  runtime: 152,
  tagline: "Why so serious?",
  cast: [
    { id: 1, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "/3qx2QFUbG6t6IlzR0F9k3Z6Yhf7.jpg" },
    { id: 2, name: "Heath Ledger", character: "The Joker", profile_path: "/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg" },
    { id: 3, name: "Aaron Eckhart", character: "Harvey Dent / Two-Face", profile_path: "/n3WvVReNMQnZg7y3tyNp0rw0lrG.jpg" },
    { id: 4, name: "Michael Caine", character: "Alfred Pennyworth", profile_path: "/bNOy0vnWOjJLfuNXVdRO7lTT5gA.jpg" }
  ],
  trailer: "EXeTwQWrcwY"
};