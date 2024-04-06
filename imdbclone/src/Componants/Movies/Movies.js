import React, { useCallback, useEffect, useState } from 'react';
import { GetTrendingMovies } from '../../Service/GetTrendingMovies';
import Pagination from '../Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import "./Movies.css";

const Movies = () => {
    const [movies, setMovies] = useState([]); // saving the movies in state
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const moviesFromLocalStorage = JSON.parse(localStorage?.getItem('myWatchList'));
        console.log(moviesFromLocalStorage);
        setWatchList(moviesFromLocalStorage);
    }, []);
    useEffect(() => {
        setLoader(true);
        GetTrendingMovies(page)
            .then((data) => {
                setMovies(data);
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }, [page]);

    const loadNextPageMovies = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
    }, []);
    const loadPreviousPageMovies = useCallback(() => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));

    }, []);
    // adding into watch list
    const toggleWatchList = useCallback((movie) => {
        if (watchList?.includes(movie)) {
            const isMovieInWatchList = watchList.some((item) => item.id === movie.id);
            if (isMovieInWatchList) {
                setWatchList((preMoviesList) => {
                    const filteredMovies = preMoviesList.filter((m) => m.id !== movie.id);
                    localStorage.setItem('myWatchList', JSON.stringify(filteredMovies));
                    return filteredMovies;
                })
            }
        } else {
            setWatchList((preMoviesList) => {
                const newMoviesList = preMoviesList?.length > 0 ? [...preMoviesList, movie] : [movie];
                localStorage.setItem('myWatchList', JSON.stringify(newMoviesList));
                return newMoviesList;
            });
        }

    }, [watchList]);
    return (

        <div>
            {loader ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (<div>
                <div className='text-2xl font-bold text-center text-white mt-3'> Trending Movies </div>
                <div className='flex flex-wrap'>
                    {movies && movies?.map((movie) => {
                        const isMovieInWatchList = watchList?.some((item) => item.id === movie.id);
                        return (
                            <div
                                key={movie.id}
                                className='w-[155px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300  relative'
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})`}}>
                                <div className='absolute bottom-0 bg-slate-100 opacity-80 p-0.5 text-xl rounded-md'>
                                    {!isMovieInWatchList ? (
                                        <div onClick={() => { toggleWatchList(movie) }}>
                                            <FontAwesomeIcon icon={regularBookmark} />
                                        </div>
                                    ) :
                                        <div onClick={() => { toggleWatchList(movie) }}>
                                            <FontAwesomeIcon icon={solidBookmark} />
                                        </div>}
                                </div>
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