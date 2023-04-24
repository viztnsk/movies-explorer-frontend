import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="auth">
     <form className="auth__form">
     <label className="auth__label">E-mail
        <input type="text" id="email-input" className="auth__input" placeholder="pochta@yandex.ru" required/>
        <span className='auth__error'>Обязательное поле</span>
      </label>
      <label className="auth__label">Пароль
        <input type="password" id='password-input' className="auth__input" placeholder="Ваш пароль" required/>
        <span className="auth__error">Обязательное поле</span>
      </label>
      <button className="auth__button" type="submit">Войти</button>
      <div className="auth__info">
        <p className="auth__text">Ещё не зарегистрированы?</p>
        <Link to={'/signup'} className='auth__link'>Регистрация</Link>
      </div>
     </form>
    </section>
  )
}

export default Login;