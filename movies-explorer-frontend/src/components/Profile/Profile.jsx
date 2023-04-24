import { useState } from "react";
import { Link } from "react-router-dom";
function Profile(props) {
  const [edit, setEdit] = useState(false)
  const onEdit = () => {
    setEdit(!edit)
    setDisabled(!isDisabled)
  }
  const errorMessage = 'При обновлении профиля произошла ошибка.'
  const [isDisabled, setDisabled] = useState(true);
  return (
    <section className="profile">
     <h1 className="profile__heading">Привет, {props.name}!</h1>
     <form className="profile__form">
      <label className="profile__label" >Имя
        <input type="text" className="profile__input" placeholder={props.name} disabled={isDisabled}/>
      </label>
      <label className="profile__label">Email
        <input type="text" className="profile__input" disabled={isDisabled} placeholder={props.email}/>
      </label>
      <button className={`profile__edit-button ${edit ? 'profile_hidden' : ''}`} type='button' onClick={onEdit}>Редактировать</button>
     </form>
     <Link to="/" className={`profile__exit ${edit ? 'profile_hidden' : ''}`}>Выйти из аккаунта</Link>
     <div className={`profile__edit ${edit ? 'profile_shown' : ''}`}>
      <span className={`profile__error`}>{errorMessage}</span>
      <button type='button' className={`profile__save-button`} onClick={onEdit}>Сохранить</button>
      </div>
    </section>
  )
}

export default Profile;