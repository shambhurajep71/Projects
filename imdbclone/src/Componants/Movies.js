import React, { useEffect, useState } from 'react';
import { GetTrendingMovies } from '../Service/GetTrendingMovies';
import Pagination from './Pagination';

const Movies = () => {
    const [movies, setMovies] = useState([]); // saving the movies in state
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false)
    useEffect(() => {

        GetTrendingMovies(page)
            .then((data) => setMovies(data),
                setLoader(false)
            )
            .catch((err) => console.error(err),
                setLoader(false));
    }, [page]);

    const loadNextPageMovies = () => {
        setPage(page + 1);
    }
    const loadPreviousPageMovies = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }
    return (
        <div>
            {loader ? (
                <div>Loading</div>
            ) : (<div>
                <div className='text-2xl font-bold text-center text-white mt-3'> Trending Movies </div>
                <div className='flex flex-wrap'>
                    {movies && movies.map((movie) => {
                        return (
                            <div
                                key={movie.id}
                                className='w-[155px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 '
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})` }}>
                                <div className='text-white text-center bg-gray-900 opacity-60 font-semibold rounded-t-xl w-full'>
                                    {movie?.title}
                                </div>
                            </div>
                        )
                    })}

                </div>
                <Pagination
                    prePage={loadPreviousPageMovies}
                    nextPage={loadNextPageMovies}
                    currPage={page} />
            </div>)}
        </div>

    );
};

export default Movies