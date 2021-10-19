import {NavLink, useParams} from "react-router-dom";
import MovieBackground from "../assets/images/movie_bg.png";
import {FaPlay, FaRegClock, FaStar, FaTimes} from "react-icons/all";
import '../assets/scss/details-page.scss'
import {useEffect, useState} from "react";
import Carousel from "react-elastic-carousel";
import DiscoverMovie from "../components/DiscoverMovie";
import axios from "axios";

const Detail = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(undefined);

  const fetchMovieData = () => {
    return new Promise(async (resolve) => {
      const result = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=0785a9f4ebd001118cf5ca0dca21f567&append_to_response=videos`)
      return resolve(result && result.data ? result.data : {})
    })
  }

  const fetchRelatedMoviesData = (genres) => {
    return new Promise(async (resolve) => {
      const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=0785a9f4ebd001118cf5ca0dca21f567&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=${genres}&page=1`)
      resolve(result && result.data && result.data.results ? result.data.results : [])
    })
  }

  const fetchData = () => {
    fetchMovieData().then(data => {
      const has_video = data.videos && data.videos.results && data.videos.results.length > 0
      setMovie(data)
      setHasVideo(has_video)
      if (has_video) {
        setVideoKey(data.videos.results[0].key)
      }

      fetchRelatedMoviesData(data.genres.map(genre => genre.id).join(',')).then(relatedMoviesData => {
        setRelatedMovies(relatedMoviesData.filter(movie => movie.id !== parseInt(movieId)))
      })
    })
  };

  useEffect(() => {
    fetchData()
  }, [movieId])

  return (
    <div className="details-page">
      <div className="movie-preview" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.backdrop_path}")` }}>
      <div className={`iframe-content ${showVideo ? 'iframe-content-active' : ''}`} >
        <button className="close-button" onClick={() => setShowVideo(!showVideo)}>
          <div className="close-icon">
            <FaTimes/>
          </div>
        </button>
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoKey}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
      </div>
      <button className={`play-button ${hasVideo ? 'play-button-show' : 'play-button-hide'}`} onClick={() => setShowVideo(!showVideo)}>
        <div className="play-icon">
          <FaPlay/>
        </div>
      </button>
    </div>

      <div className="container">
        <div className="movie-title">
          <h1 className="app-main-title">{movie.title}</h1>
          <div className="quality">
            4k
          </div>
        </div>

        <div className="movie-data">
          <div className="line-data">
            <div className="data">
              <FaRegClock /> {movie.runtime} minutes
            </div>
            <div className="data">
              <FaStar /> {movie.vote_average} (IMDb)
            </div>
          </div>
        </div>

        <div className="movie-data">
          <div className="col-data">
            <div className="data">
              <p className="data-title">Release date</p>
              <p>{movie.release_date}</p>
            </div>
            <div className="data">
              <p className="data-title">Genre</p>
              <ul className="labels">
                {movie.genres?.map(genre => (
                  <li>
                    <NavLink key={genre.id} to={`/discover/${genre.id}`}>{genre.name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="movie-data">
          <div className="text-data">
            <div className="data">
              <p className="data-title">Synopsis</p>
              <p className="data-text">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>


        <h2 className="app-main-second-title">Related Movies</h2>
        <Carousel itemsToShow={1} showArrows={false} pagination={false} className="movie-categories">
          {relatedMovies.map(relatedMovie => (
            <DiscoverMovie key={relatedMovie.id} height={200} movie={relatedMovie} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Detail
