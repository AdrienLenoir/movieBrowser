import {FaStar} from "react-icons/all";
import '../assets/scss/trending-movie.scss'
import {NavLink} from "react-router-dom";

const TrendingMovie = (props) => {
  return (
    <NavLink to={`/movie/${props.movie.id}`} className="trending-movie" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${props.movie.poster_path}")` }}>
      <div className="trending-movie-note">
        <p>IMDb</p>
        <p><FaStar/> {props.movie.vote_average}</p>
      </div>
      <p className="trending-movie-title">
        {props.movie.title ?? props.movie.name}
      </p>
    </NavLink>
  )
}

export default TrendingMovie
