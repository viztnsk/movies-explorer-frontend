import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profile from '../../images/avatar.svg';
import Cross from '../../images/cross.svg'
import Bars from '../../images/bars.svg'
function Navigation() {
  const path = useLocation().pathname;
  const [burger, setBurger] = useState(false)
  const toggleBurger = () => setBurger(!burger);
  return (
    <>
      <nav className={`navigation 
      ${burger ? 'navigation_burger' : ''}
      `} style={burger ? {position: 'absolute', top: 0, height: document.body.clientHeight} : {}}>
        <div className='navigation__cover' style={burger ? {position: 'absolute', top: 0, height: document.body.clientHeight} : {}}>
          <div className={`navigation__links 
          ${burger ? 'navigation__links_burger' : ''}
          `}>
            <Link to='/' className={`navigation__link  navigation__link_type_hidden ${burger ? 'navigation__link_type_burger' : ''}`}>
              Главная 
            </Link> 
            <Link to='/movies' className={`navigation__link  ${path === '/movies' ? 'navigation__link_type_active' : ''} ${burger ? 'navigation__link_type_burger' : ''}`}>
              Фильмы
            </Link>
            <Link to='/saved-movies' className={`navigation__link ${path === '/saved-movies' ? 'navigation__link_type_active' : ''} ${burger ? 'navigation__link_type_burger' : ''}`}>
              Сохраненные фильмы
            </Link>
          </div>
          <Link to='/profile' className='navigation__profile'><img src={profile} alt='Аккаунт'></img>Аккаунт</Link>
        </div>
      </nav>
      <div className={`burger`} onClick={toggleBurger}><img className={`burger__image ${burger ? 'burger__image_type_cross' : ''}`} src={burger ? Cross : Bars} alt="Burger Menu" /></div>
    </>
  );
}
export default Navigation;




