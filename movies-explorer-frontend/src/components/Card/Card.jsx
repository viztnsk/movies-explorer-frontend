import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { BASE_MOVIES_API_URL } from "../../utils/constants";
function Card(props) {
  const user = useContext(CurrentUserContext)
  const path = useLocation().pathname;

  const [movie, setMovie] = useState({ 
    image: `${BASE_MOVIES_API_URL}${props.img.url}`,
    nameRU: props.movie.nameRU,
    duration: props.movie.duration,
    trailerLink: props.movie.trailerLink,
    country: props.movie.country,
    director: props.movie.director,
    year: props.movie.year,
    description: props.movie.description,
    thumbnail: `${BASE_MOVIES_API_URL}/${props.img.url}`,
    nameEN: props.movie.nameEN,
    movieId: props.movie.id,
  })
  const [shown, setShown] = useState(false);
  const showDelete = () => setShown(true);
  const hideDelete = () => setShown(false);
  const [saved, setSaved] = useState(props.isSaved)
  const checkIsSaved = () => {
    return props.savedMovies.some((savedMovie) => savedMovie._id === props._id)
  }

  useEffect(() => {
    if (path === '/movies') {
      setSaved(checkIsSaved())
    }
  }, [])

  function handleSaveMovie() {
    if (saved) {
      movie._id = props._id
      props.onDelete(movie)
    } else {
      props.onSave(movie, user)
    }
    setSaved(!saved)
    }

    function handleDeleteMovie() {
      movie._id = props._id
      props.onDelete(movie)
    }
  function convertDuration (duration) {
    if (duration > 60) {
      let hours, minutes;
      hours = Math.floor(duration / 60);
      minutes = duration - hours * 60;
      return `${hours}ч ${minutes}м`;
    }
    return `${duration}м`;
  }
  return (
    <article className="card">
      <button className="card__button">
        <Link to={props.link} target="_blank">
          <img className='card__image' src={ path === '/saved-movies' ? `${props.img}` : `${BASE_MOVIES_API_URL}/${props.img.url}`}
        alt="Заставка фильма"/></Link>
      </button>
      <div className="card__container" onMouseEnter={showDelete} onMouseLeave={hideDelete}>
        <div className="card__info">
          <h2 className="card__title">{props.title}</h2>
          <p className="card__duration">{convertDuration(props.duration)}</p>
        </div>

        {path === '/movies'
          ? <button className={`card__like ${!saved ? '' : 'card__liked'}`} type='button' disabled={props.disabled} onClick={handleSaveMovie}></button>
          :  <button className={`card__like card__delete ${shown ? 'card__delete_shown' : ''}`} type='button' disabled={props.disabled}  onClick={handleDeleteMovie}></button>
        }
      </div>
    </article>
  )
}

export default Card;