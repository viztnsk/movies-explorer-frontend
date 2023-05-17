import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { DEVICE_WIDTH, MORE_MOVIE_COUNT, MOVIE_COUNT } from "../../utils/constants"
import Card from "../Card/Card"

function CardList(props) {
  const path = useLocation().pathname;
  const { DESKTOP, TABLET, MOBILE } = DEVICE_WIDTH
  const [width, setWidth] = useState(window.innerWidth)
  const [cardCount, setCardCount] = useState(0)
  
  const handleMoreData = () => {
    let nextRow
    if (width >= DESKTOP) {
      nextRow = MORE_MOVIE_COUNT.DESKTOP
    } else if (width >= TABLET) {
      nextRow = MORE_MOVIE_COUNT.TABLET
    } else if (width > MOBILE) {
      nextRow = MORE_MOVIE_COUNT.MOBILE
    }
    setCardCount(cardCount + nextRow)
  }

  useEffect(() => {
    const resize = () => {
      setTimeout(() => 
      setWidth(window.innerWidth), 100)
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (path === '/saved-movies') {
      setCardCount(props.savedMovies.length)
    } else {
      if (width > DESKTOP) {
        setCardCount(MOVIE_COUNT.DESKTOP)
      } else if (width > TABLET) {
        setCardCount(MOVIE_COUNT.TABLET)
      } else if (width > MOBILE) {
        setCardCount(MOVIE_COUNT.MOBILE)
      }
    }
  }, [path, width, DESKTOP, TABLET, MOBILE])

  return (
    <section className="cards">
      <div className="cards__list">
        {(path === '/movies' && props.movies && !props.isLoading) ?
        props.movies.slice(0, cardCount)
        .map
        (movie =>
          (
          <Card 
            key={movie.id}
            _id={movie._id}
            isSaved={movie.isSaved}
            movie={movie}
            img={movie.image}
            title={movie.nameRU}
            duration={movie.duration}
            link={movie.trailerLink}
            country={movie.country}
            director={movie.director}
            year={movie.year}
            owner={movie.owner}
            description={movie.description}
            thumbnail={movie.thumbnail}
            nameEN={movie.nameEn}
            onSave={props.onSave} 
            onDelete={props.onDelete}
            saved={props.saved}
            disabled={props.disabled}
            savedMovies={props.savedMovies}
          />
        )) : null}
        {(path === '/saved-movies' && props.savedMovies) ?
        props.savedMovies
        .map
        (movie => (
          <Card 
            key={movie.movieId}
            _id={movie._id}
            movie={movie}
            img={movie.image}
            title={movie.nameRU}
            duration={movie.duration}
            link={movie.trailerLink}
            onSave={props.onSave} 
            onDelete={props.onDelete}
            savedMovies={props.savedMovies}
          />
        )): null
        }
      </div>
      {props.movies?.length > cardCount && 
      <button className={`cards__load-button`} type='button' onClick={handleMoreData}>
        Ещё
      </button>}
    </section>
  )
}
export default CardList;