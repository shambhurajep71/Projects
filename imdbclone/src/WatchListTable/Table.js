import React, { useState, useEffect, Fragment } from 'react'
const Table = () => {
    //getting movies from local storage and saving them into a state
    const [myFavoriteMovies, setMyFavoriteMovies] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        if (localStorage.getItem('myWatchList')) {
            setMyFavoriteMovies(JSON.parse(localStorage.getItem('myWatchList')));
        }
        setLoader(false);

    }, []);
    return (
        <Fragment>
            {loader ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className='border border-gray-300 ml-2 mr-2 mt-3 rounded-lg shadow-md shadow-blue-400'>
                    <table className='w-full border-collapse text-left text-gray-200'>
                        <thead>
                            <tr>
                                <th className='p-2 m-4 font-bold'>Name</th>
                                <th className='p-2 m-4 font-bold'> Rating</th>
                                <th className='p-2 m-4 font-bold'>Popularity </th>
                                <th className='p-2 m-4 font-bold'> Release Date</th>
                                {/* <th>Genre</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myFavoriteMovies?.length > 0 && myFavoriteMovies?.map((movie) => {
                                    return (
                                        <tr key={movie.id}>
                                            <td className='flex items-center space-x-2 px-5 py-5'>
                                                <img src={`https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path}`} alt="Movie poster" className='h-[10rem] w-[8rem] rounded-xl' />
                                                <div>
                                                    {movie?.title}
                                                </div>
                                            </td>
                                            <td>{movie?.vote_average}</td>
                                            <td>{movie?.popularity}</td>
                                            <td>{movie?.release_date}</td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>)};
        </Fragment>
    )
}

export default Table