import axios from 'axios';



export const GetPopularMovies = async (pageNo=1) => {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: { language: 'en-US', page:pageNo},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjViYjRjZmNlYzZhY2YwOTU4MDU0NDgyNmM2NDUyYyIsInN1YiI6IjY2MDU5ZTE0ZjkwYjE5MDE0OWE3YTU3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sBjxHLsRSjGEG33IFCtqV_fvYiBDtn-pFDADbEJ2RsE'
        }
      };
       const popularMovies = await axios.request(options);
       console.log(popularMovies);
       return popularMovies?.data?.results;
  }