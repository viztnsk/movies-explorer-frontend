import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/Auth'
import InfoPopup from '../InfoPopup/InfoPopup';
import Login from '../Login/Login';
import Movies from '../Movies/Movies'
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';

function App() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: ''
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const [status, setStatus] = useState(false)
  const [allMovies, setAllMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [storagedMovies, setStoragedMovies] = useState(JSON.parse(localStorage.getItem('foundMovies')) || null)
  const [saved, setSaved] = useState(false)
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [moviesError, setMoviesError] = useState(false)
  const [edit, setEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [checked, setChecked] = useState(false)
  const [isInfoPopupOpened, setInfoPopupOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)  

  useEffect(() => {
    checkToken()
	}, [])

  useEffect(() => {
    if (loggedIn) {
    Promise.all([
      mainApi.getUser(),
      mainApi.getMovies()
    ])
      .then(([user, savedMovies]) => {
        setCurrentUser({name: user.name, email: user.email, _id: user._id})
        setSavedMovies(savedMovies)
      })
      .catch(err => console.log(`Ошибка при загрузке данных с сервера на UseEffect: ${err}`))
    }
  }, [loggedIn])

  function handleInfoPopup() {setInfoPopupOpen(!isInfoPopupOpened)}

  const modifyAllMovies = (movies, savedMovies) => {
    const updatedMovies = (movies.map((movie) => {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === movie.id) {
          movie._id = savedMovie._id
          movie.isSaved = true
        } else {
          movie._id = ''
          movie.isSaved = false
        }
      })
      return movie
    }))
    setAllMovies(updatedMovies)
    return allMovies
  }

  const handleLogin = (res) => {
    setCurrentUser({ name: res.name, email: res.email, _id: res._id})
    setLoggedIn(true) 
  }

  const checkToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.getContent(token)
      .then((res) => {
        handleLogin(res)
        navigate('/movies', {replace: true})
      })
      .catch((err) => {
          setLoggedIn(false)
          setCurrentUser(null)
          mainApi.removeToken()
          return Promise.reject(err.message)
        })
    }
    if(!token) {
      localStorage.clear()
    }
  }

  function handleSignIn(values) {
    return auth.authorize(values.email, values.password)
    .then((res) => {
      mainApi.setToken(res.token)
    })
    .then(() => {
      checkToken()
      })
    .then(() => {
      setStatus(true)
      handleInfoPopup()
    })
    .catch((err) => {
      console.log(err)
      setStatus(false)
      handleInfoPopup()
    })
  }

  function updateUser(user) {
    return mainApi.patchUser(user)
    .then((user) => {
      setCurrentUser({name: user.name, email: user.email})
      setStatus(true)
      handleInfoPopup()
      setError(false)
      setSuccess(true)
    })
    .catch((err) => {
      console.log(`Произошла ошибка при обновлении данных пользователя: ${err.message}`)
      setError(true)
      setSuccess(false)
      setStatus(false)
      handleInfoPopup()
    })
    .finally(() => {
      setTimeout(() => {
        setSuccess(false)
        setError(false)
      }, 8000)
      setEdit(false)
    })
  }

  function onSave(movie) {
    setDisabled(true)
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        if (savedMovie) {
          setSavedMovies([...savedMovies, savedMovie])
          savedMovie.isSaved = true
          const localMovie = storagedMovies.find((m) => m.id === savedMovie.movieId)
          if (localMovie) {
            localMovie._id = savedMovie._id
            localMovie.isSaved = true
          }
          setDisabled(false)
      }
      localStorage.setItem('foundMovies', JSON.stringify(storagedMovies))
      return storagedMovies
    })
    .catch((err) => console.log(`Что-то пошло не так: ${err.message}`))
  }

  function onDelete(movie) {
    const deletedMovie = savedMovies.find((item) => item._id === movie._id)
    if (deletedMovie) {
      mainApi.deleteMovie(deletedMovie._id)
      .then((deletedMovie) => {
        if (deletedMovie) {
          setSavedMovies(
            savedMovies.filter((m) => m._id !== deletedMovie._id)
          )}
          deletedMovie._id = ''
          deletedMovie.isSaved = false
      })
      .catch(err => console.log(`Что-то пошло не так: ${err.message}`))
    }
  }

  const handleSearchFilter = (items, query) => {
    return items.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase())
    })
}
  function handleCheckboxFilter(items, checkboxState) {
    return !checkboxState
    ? items
    : items.filter((item) => item.duration <= 40)
  }

  function onMoviesSearch(query) {
    setMoviesError(false)
    setIsLoading(true)
    localStorage.setItem('movieQuery', query.movieInput)
    localStorage.setItem('checkboxState', checked)
    moviesApi.getMovies()
    .then((movies) => {
      modifyAllMovies(movies, savedMovies)
      })
    .then(() => {
      //allMovies не приходят сюда в обновленном виде
      console.log(allMovies)
      console.log(savedMovies)
      const movieQuery = localStorage.getItem('movieQuery')
      const foundMovies = handleSearchFilter(allMovies, movieQuery)
      console.log({foundMovies, allMovies, movieQuery})
      const checkboxState = JSON.parse(localStorage.getItem('checkboxState'))
      const checkedShortMovies = handleCheckboxFilter(foundMovies,  checkboxState)
      if (checkedShortMovies.length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
        setMoviesError(false)
        localStorage.setItem('foundMovies', JSON.stringify(checkedShortMovies))
        setStoragedMovies(foundMovies)
      }
      setIsLoading(false)
      setMoviesError(false)
      })
      .then(() => {
        console.log(JSON.parse(localStorage.getItem('foundMovies')))
        console.log(storagedMovies)
      })
      .catch((err) => {
        localStorage.removeItem('foundMovies')
        setMoviesError(true)
        setIsLoading(false)
        console.log(err.message)
      })
  }

  function handleCheckboxChange() {
    setChecked(!checked)
    localStorage.setItem('checkboxState', !checked)
    const checkedShortMovies = handleCheckboxFilter(storagedMovies, !checked)
    localStorage.setItem('foundMovies', JSON.stringify(checkedShortMovies))
      if ((checkedShortMovies.length === 0) || 
        (!localStorage.getItem('foundMovies'))) {
        setNotFound(true)
      } else {
        setNotFound(false)
        setMoviesError(false)
        localStorage.setItem('foundMovies', JSON.stringify(checkedShortMovies))
      }
      setIsLoading(false)
      setMoviesError(false)
  }

  function onSavedMoviesSearch(query) {
    const searchedSavedMovies = handleSearchFilter(savedMovies, query.movieInput)
    const checkedShortSavedMovies = handleCheckboxFilter(searchedSavedMovies, checked)
    if (checkedShortSavedMovies.length === 0) {
      setNotFound(true)
    } else {
      setNotFound(false)
      setMoviesError(false)
      setSearchedSavedMovies(checkedShortSavedMovies)
    }
    return searchedSavedMovies
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
        <Route path="*" element={<NotFound></NotFound>}/>

        <Route exact path ='/' element={<Main loggedIn={loggedIn}></Main>}/>

        <Route exact path='/movies' element={ 
        <ProtectedRoute 
        loggedIn={loggedIn} 
        component={Movies} 
        onSearch={onMoviesSearch}
        isLoading={isLoading}
        notFound={notFound}
        checked={checked}
        setChecked={setChecked}
        handleCheckboxChange={handleCheckboxChange}
        moviesError={moviesError}
        saved={saved}
        setSaved={setSaved}
        onSave={onSave}
        onDelete={onDelete}
        savedMovies={savedMovies}
        disabled={disabled}
        />
        }/>

        <Route exact path='/saved-movies' element={ 
          <ProtectedRoute 
          loggedIn={loggedIn}
          onSearch={onSavedMoviesSearch}
          searchedSavedMovies={searchedSavedMovies}
          setSearchedSavedMovies={setSearchedSavedMovies}
          notFound={notFound}
          component={SavedMovies}
          checked={checked}
          onDelete={onDelete}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          setChecked={setChecked}
          moviesError={moviesError}
          saved={saved}
          onSave={onSave}
          handleCheckboxFilter={handleCheckboxFilter}
          setNotFound={setNotFound}
          />
        }/>
        <Route exact path='/profile' element={ 
          <ProtectedRoute 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn} 
          component={Profile} 
          name={currentUser.name} 
          email={currentUser.email}
          updateUser={updateUser}
          success={success}
          error={error}
          setError={setError}
          edit={edit}
          setChecked={setChecked}
          setStoragedMovies={setStoragedMovies}
          />
      }/>
      <Route exact path='/signin' element={
          <Login onLogin={handleSignIn}  handleInfoPopup={handleInfoPopup} setStatus={setStatus}/>
        }/>
        <Route exact path='/signup' element={
          <Register 
          setStatus={setStatus}
          handleInfoPopup={handleInfoPopup}
          checkToken={checkToken}/>
        }/>
      </Routes>
      <InfoPopup status={status} success={'Успешно!✅'} fail={'Что-то пошло не так ❌ Попробуйте ещё раз.'} isOpen={isInfoPopupOpened} onClose={handleInfoPopup}/>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
