import '../assets/scss/promoted-movie.scss'
import {FaPlay} from "react-icons/all";
import {NavLink} from "react-router-dom";

const PromotedMovie = (props) => {
  return (
    <NavLink to={`/movie/${props.movie.id}`} className="promoted-movie" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${props.movie.poster_path}")` }}>

      <div className="spotlight-card">
        <div className="icon">
          <div className="play-icon">
            <FaPlay/>
          </div>
        </div>
        <div className="text">
          <p>Movie Spotlight</p>
          <p>{props.movie.title ?? props.movie.name}</p>
        </div>
      </div>
    </NavLink>
  )
}

export default PromotedMovie
