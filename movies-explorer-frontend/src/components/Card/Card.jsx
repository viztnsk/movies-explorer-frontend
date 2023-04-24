import { useState } from "react";
function Card(props) {
  const [shown, setShown] = useState(false);
  const showDelete = () => setShown(true);
  const hideDelete = () => setShown(false);
  const [isLiked, setLike] = useState(false)
  const likeMovie = () => setLike(!isLiked);
  return (
    <article className="card">
      <button className="card__button">
        <img className='card__image' src={props.img} alt="Заставка фильма"/>
      </button>
      <div className="card__container" onMouseEnter={showDelete} onMouseLeave={hideDelete}>
        <div className="card__info">
          <h2 className="card__title">{props.title}</h2>
          <p className="card__duration">{props.duration}</p>
        </div>
        <button className={`card__like ${isLiked ? 'card__liked' : ''} ${props.saved ? 'card__delete' : ''} ${shown ? 'card__delete_shown' : ''}`} type='button' onClick={likeMovie}></button>
      </div>
    </article>
  )
}

export default Card;