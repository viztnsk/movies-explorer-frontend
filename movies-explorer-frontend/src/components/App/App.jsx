import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import InfoPopup from '../InfoPopup/InfoPopup';
import Login from '../Login/Login';
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [status, setStatus] = useState(false);
  const [isInfoPopupOpened, setInfoPopupOpen] = useState(false);
  const CloseInfoPopup = () => {setInfoPopupOpen(false)}

  return (
    <div className="page">
      <Header />
      <Routes>
      <Route path="*" element={<NotFound></NotFound>}/>
      <Route exact path='/' element={
        <Main />
    }/>
      <Route exact path='/movies' element={
        <Movies />
      }/>
      <Route exact path='/saved-movies' element={
        <SavedMovies />
      }/>
      <Route exact path='/signin' element={
        <Login />
      }/>
      <Route exact path='/signup' element={
        <Register />
      }/>
      <Route exact path='/profile' element={
        <Profile name='Виталий' email={'pochta@yandex.ru'}></Profile>
      }/>
    </Routes>
    <InfoPopup status={status} success={'Успешно!✅'} fail={'Что-то пошло не так ❌ Попробуйте ещё раз.'} isOpen={isInfoPopupOpened} onClose={CloseInfoPopup}/>
    </div>
  );
}

export default App;
