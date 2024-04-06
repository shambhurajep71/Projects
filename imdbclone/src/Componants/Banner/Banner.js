import React, { useEffect, useState, Fragment } from 'react'
import { GetPopularMovies } from '../../Service/GetPopularMovies'
import './Banner.css'


const Banner = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    GetPopularMovies()
      .then((data) => {
        const topPopularMovies = [];
        console.log("data", data);
        data.forEach((item, index) => {
          if (index < 5) {
            topPopularMovies.push(item);
          }
        })
        console.log("topPopularMovies", topPopularMovies);
        setPopularMovies(topPopularMovies);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <Fragment>
    </Fragment >
  )
}

export default Banner
