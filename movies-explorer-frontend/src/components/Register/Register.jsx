import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="auth">
     <form className="auth__form">
      <label className="auth__label">Имя
        <input type="text" id='name-input' className="auth__input" placeholder="Иван" required minLength={2} maxLength={30}/>
        <span className="auth__error">Что-то пошло не так...</span>
      </label>
      <label className="auth__label">E-mail
        <input type="email" id="email-input" className="auth__input" placeholder="pochta@yandex.ru" required/>
        <span className="auth__error">Что-то пошло не так...</span>
      </label>
      <label className="auth__label">Пароль
        <input type="password" id='password-input' className="auth__input" placeholder="От 8 знаков" required minLength={8}/>
        <span className="auth__error auth__error_shown">Что-то пошло не так...</span>
      </label>
      <button className="auth__button" type="submit">Зарегистрироваться</button>
      <div className="auth__info auth__info_type_reg">
        <p className="auth__text">Уже зарегистрированы?</p>
        <Link to={'/signin'} className='auth__link'>Войти</Link>
      </div>
     </form>
    </section>
  )
}

export default Register;