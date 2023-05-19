import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
function Profile({ name, email, ...props }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext)
  const [values, setValues] = useState({
    name: currentUser.name,
    email: currentUser.email
  })
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  })
  const [isValid, setIsValid] = useState(false)
  const [edit, setEdit] = useState(false)
  const [isInputDisabled, setInputDisabled] = useState(true)
  const errorMessage = 'При обновлении профиля произошла ошибка.'

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target
    const newValue = {
      ...values, [name]: value
    }
    setValues(newValue)
    if ((newValue.name === currentUser.name) && (newValue.email === currentUser.email)) {
      setIsValid(false)
    } else {
      setIsValid(e.target.closest("form").checkValidity())
    }
    setErrors((state) => (
      {...state, [name]: validationMessage }
      ))
  }
  
  const onEdit = () => {
    setEdit(!edit)
    setInputDisabled(!isInputDisabled)
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    const {name, email} = values;
    if (!name || !email) return;
    props.updateUser(values)
    onEdit()
  }

  useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email})
    setIsValid(false)
  }, [currentUser.name, currentUser.email])

  function signOut() {
    localStorage.clear()
    props.setChecked(false)
    props.setStoragedMovies([])
    navigate('/', {replace: true})
    props.setLoggedIn(false)
  } 

  return (
    <>
    <Header loggedIn={props.loggedIn}/>
    <section className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={onSubmit}>
      <label className={"profile__label"} htmlFor={'name'}>
        Имя
      <input 
        onChange={handleChange} 
        name={'name'}
        type={'text'}
        id={'name'}
        placeholder={'Ваше имя'}
        className={"profile__input"}
        disabled={props.disabled ? props.disabled : isInputDisabled}
        value={values.name}/>
      </label>
      <label className={"profile__label"} htmlFor={'email'}>
        E-mail
      <input 
        onChange={handleChange} 
        name={'email'}
        type={'text'}
        id={'email'}
        placeholder={'pochta@yandex.ru'}
        className={"profile__input"}
        disabled={props.disabled ? props.disabled : isInputDisabled}
        value={values.email}/>
      </label>
      <button className={`profile__edit-button ${edit ? 'profile_hidden' : ''}`} type='button' onClick={onEdit}>Редактировать</button>
      </form>
      <button type='button' to="/" onClick={signOut} className={`profile__exit ${edit ? 'profile_hidden' : ''}`}>
        Выйти из аккаунта
      </button>
      <div className={`profile__edit ${edit ? 'profile_shown' : ''}`}>
        {props.error && 
        <span className='profile__error'
          >{errorMessage}
        </span>}
        <button type='submit' className={`profile__save-button`} onClick={onSubmit} disabled={props.disabled ? props.disabled : !isValid}
        >{props.success ? 'Данные обновлены' : 'Сохранить'}</button>
      </div>
    </section>
    </>
  )
}

export default Profile