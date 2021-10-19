import '../assets/scss/discover-movie.scss'
import {NavLink} from "react-router-dom";

const DiscoverMovie = (props) => {
  return (
    <NavLink to={`/movie/${props.movie.id}`} className="discover-movie">
      <div className="discover-movie-image" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${props.movie.poster_path}")`,height:`${props.height}px`}}/>
      <p className="discover-movie-title">
        {props.movie.title ?? props.movie.name} <span>({new Date(props.movie.release_date).getFullYear()})</span>
      </p>
    </NavLink>
  )
}

export default DiscoverMovie
