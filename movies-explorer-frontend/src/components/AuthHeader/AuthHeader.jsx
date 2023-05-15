import { Link, useLocation } from "react-router-dom";

function AuthHeader() {
  const path = useLocation().pathname;
  return (
    <div className='header__auth'>
    <Link to='/' className='header__logo header__logo_auth'></Link>
    <h1 className='header__heading'>{path === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
  </div>
  )
}

export default AuthHeader;
