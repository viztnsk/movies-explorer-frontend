import { useLocation, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
function Header(props) {
  const path = useLocation().pathname; 

return !props.loggedIn 
  ? (<header className={`header ${path === '/' ? 'header_dark' : ''}`}>
      <div className="header__container">
        <Link to='/' className='header__logo'></Link>
        <div className='header__links'>
          <Link to='/signup' className="header__link header__link_type_reg">
                Регистрация
          </Link><Link to='/signin' className="header__link header__link_type_login">
                Войти
          </Link>
        </div>
      </div>
    </header>) 
    : ( <header className={`header ${path === '/' ? 'header_dark' : ''}`}>
      <div className="header__container">
              <Link to='/' className='navigation__logo'></Link>
              <Navigation />
            </div>
        </header>)
}

export default Header;