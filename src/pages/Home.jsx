import PromotedMovie from "../components/PromotedMovie";
import TrendingMovie from "../components/TrendingMovie";
import Carousel from 'react-elastic-carousel'
import axios from "axios";
import {useEffect, useState} from "react";

const Home = () => {
  const [promotedMovie, setPromotedMovie] = useState({});
  const [trandingMovies, setTrandingMovies] = useState([]);

  const fetchData = () => {
    axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=0785a9f4ebd001118cf5ca0dca21f567')
      .then((res) => {
        const results = res.data && res.data.results ? res.data.results : []

        setTrandingMovies(results)
        setPromotedMovie(results[Math.floor(Math.random() * results.length)])
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="app-main-title"><span>Movie</span>Browser</h1>

        <PromotedMovie movie={promotedMovie}/>

        <h2 className="app-main-second-title">Trending</h2>
        <Carousel itemsToShow={1} showArrows={false} pagination={false}>
          {trandingMovies.map(trandingMovie => (
                <TrendingMovie key={trandingMovie.id} movie={trandingMovie} />
              ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Home
