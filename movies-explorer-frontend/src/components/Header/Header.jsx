import { memo } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import AuthHeader from '../AuthHeader/AuthHeader';
import Navigation from '../Navigation/Navigation.jsx';
function Header() {
  const path = useLocation().pathname;  
  return (
    <header className={`header ${path === '/' ? 'header__dark' : ''}`}>
        <Routes>
          <Route exact path='/' element={
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
          }/>
          <Route exact path='/movies' element={
            <div className="header__container">
              <Link to='/' className='navigation__logo'></Link>
              <Navigation />
            </div>
          }/>
          <Route exact path='/saved-movies' element={
             <div className="header__container">
             <Link to='/' className='navigation__logo'></Link>
             <Navigation />
           </div>
          }/>
          <Route exact path='/profile' element={
             <div className="header__container">
             <Link to='/' className='navigation__logo'></Link>
             <Navigation />
           </div>
          }/>
          <Route exact path='/signin' element={
            <AuthHeader />
          }/>
          <Route exact path='/signup' element={
            <AuthHeader />
          }/>
        </Routes>
    </header>
  )
}

export default memo(Header);