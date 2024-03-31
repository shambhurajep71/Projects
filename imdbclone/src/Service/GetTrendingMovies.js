import axios from "axios";

export const GetTrendingMovies = async (pageNo) => {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/movie/day',
        params: { language: 'en-US', page: pageNo | 1 },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjViYjRjZmNlYzZhY2YwOTU4MDU0NDgyNmM2NDUyYyIsInN1YiI6IjY2MDU5ZTE0ZjkwYjE5MDE0OWE3YTU3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sBjxHLsRSjGEG33IFCtqV_fvYiBDtn-pFDADbEJ2RsE'
        }
    };
    const trendingMovies = await axios.request(options);
    console.log(trendingMovies);
    return trendingMovies?.data?.results;

}