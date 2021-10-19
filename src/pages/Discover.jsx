import {FaSearch} from "react-icons/all";
import '../assets/scss/discover-page.scss'
import DiscoverMovie from "../components/DiscoverMovie";
import Carousel from "react-elastic-carousel";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const Discover = () => {
  let { categoryRouteId } = useParams()

  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [maxAPIPage, setMaxAPIPage] = useState(undefined);
  const [categoryId, setCategoryId] = useState(categoryRouteId);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = () => {
    return new Promise(async (resolve) => {
      const result = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=0785a9f4ebd001118cf5ca0dca21f567')
      resolve(result && result.data && result.data.genres ? result.data.genres : [])
    })
  }

  const fetchDiscoverMoviesData = async () => {
    if (!page || !categoryId || (maxAPIPage && page > maxAPIPage)) return;
    let fetchApiURL = `https://api.themoviedb.org/3/discover/movie?api_key=0785a9f4ebd001118cf5ca0dca21f567&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=${categoryId}&page=${page}`

    if (isSearching) {
      fetchApiURL = `https://api.themoviedb.org/3/search/movie?api_key=0785a9f4ebd001118cf5ca0dca21f567&query=${search}&page=${page}&include_adult=false`
    }

    axios.get(fetchApiURL)
      .then(result => {
        if (!maxAPIPage) {
          setMaxAPIPage(result.data.total_pages)
        }

        setDiscoverMovies(prevState => [...prevState, ...result.data.results])
        setPage(page + 1)
        setIsFetching(false)
      })
  }

  const fetchData = async () => {
    if (!categories || categories.length === 0) {
      const categories = await fetchCategoriesData()
      if (!categoryId && categories[0] && categories[0].id) {
        setCategoryId(categories[0].id)
      }
      setCategories(categories)
    }

    await fetchDiscoverMoviesData();
  };

  useEffect( () => {
    setPage(1)
    setDiscoverMovies([])
    setCategoryId(categoryRouteId)
  }, [categoryRouteId]);

  useEffect( () => {
    setSearch("")
    setIsSearching(false)
    setPage(1)
    fetchData().then();

    window.addEventListener("scroll", moviesWrapperScroll);
    return () => window.removeEventListener("scroll", moviesWrapperScroll);
  }, [categoryId]);

  useEffect(( ) => {
    if (isFetching) {
      fetchDiscoverMoviesData().then()
    }
  }, [isFetching]);

  const moviesWrapperScroll = async () => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
      return;
    }
    setIsFetching(true)
  }

  const searchMovie = (event) => {
    event.preventDefault()
    setIsSearching(true)
    setPage(1)
    setDiscoverMovies([])
    setIsFetching(true)
  }

  return (
    <div className="discover-page">
      <div className="container">
        <h1 className="app-main-title"><span>Movie</span>Browser</h1>

        <form className="search-movie-bar" onSubmit={searchMovie}>
          <button className="search-movie-bar-icon" type="submit">
            <FaSearch />
          </button>
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="text" id="searchmovie" name="searchmovie" placeholder="Sherlock Holmes"/>
        </form>

        <Carousel itemsToShow={3} showArrows={false} pagination={false} className="movie-categories">
          {categories.map((category, index) => (
            <NavLink key={category.id} to={`/discover/${category.id}`} className={`movie-category ${categoryId === category.id ? 'active' : (!categoryId && index === 0) ? 'active' : ''}`}>{category.name}</NavLink>
          ))}
        </Carousel>

        <div className="searched-movies">
          {discoverMovies.map((discoverMovie) => (
            <DiscoverMovie key={discoverMovie.id} movie={discoverMovie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Discover
