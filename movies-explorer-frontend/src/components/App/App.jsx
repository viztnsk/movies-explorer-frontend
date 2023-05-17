import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { savedMoviesContext } from '../../contexts/savedMoviesContext';
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
import { SHORT_MOVIE_LENGTH } from '../../utils/constants';

function App() {
  const path = useLocation().pathname
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: ''
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const [status, setStatus] = useState(false)


  const [allMovies, setAllMovies] = useState([])
  //все начальные фильмы
  const [savedMovies, setSavedMovies] = useState([]) // все сохраненные фильмы
  const [initialSavedMovies, setInitialSavedMovies] = useState([]) // все сперва сохраненные фильмы
  const [searchedMovies, setSearchedMovies] = useState([]) // найденные фильмы
  const [searchedShortMovies, setSearchedShortMovies] = useState([]) // найденные короткометражки
  const [storagedMovies, setStoragedMovies] = useState(JSON.parse(localStorage.getItem('foundMovies')) || []) // найденные фильмы из локального хранилища
  const [storagedShortMovies, setStoragedShortMovies] = useState(JSON.parse(localStorage.getItem('foundShortMovies')) || []) //найденные короткометражки из локального хранилища
  
  const [saved, setSaved] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [moviesError, setMoviesError] = useState(false)
  const [edit, setEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem('checkboxState')) || false)
  const [savedChecked, setSavedChecked] = useState(false)
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
        setInitialSavedMovies(savedMovies)
      })
      .catch(err => console.log(`Ошибка при загрузке данных с сервера: ${err}`))
    }
  }, [loggedIn])

  useEffect(() => {
    if (path === '/movies') {
      mainApi
				.getMovies()
				.then((savedMovies) => {
					setSavedMovies(savedMovies)
				})
				.catch((err) => {
					console.log(`Ошибка при загрузке данных с сервера: ${err}`)
				})
    }
	}, [])

  useEffect(() => {
    const movieQuery = localStorage.getItem('movieQuery')
    if (storagedMovies && (movieQuery)) {
      setSearchedMovies(storagedMovies)
    } else if (storagedShortMovies && movieQuery && checked ) {
      //setSearchedMovies(storagedShortMovies)
      setSearchedShortMovies(storagedShortMovies)
    }
  }, []//[path]
  )

  function handleInfoPopup() {setInfoPopupOpen(!isInfoPopupOpened)}

  const modifyAllMovies = (movies, savedMovies) => {
    const updatedMovies = (movies.map((movie) => {
      const savedMovie = savedMovies.find((savedMovie) => movie.id === savedMovie.movieId)
      if (savedMovie) {
        movie._id = savedMovie._id
        movie.isSaved = true
      } else {
        movie._id = ''
        movie.isSaved = false
      }
      return movie
    }))
    setAllMovies(updatedMovies)
    return updatedMovies
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
        if (path === '/signin' || path === '/signup' || path === '/') {
          navigate('/movies', {replace: true})
        } else if (path === '/movies' || path === '/saved-movies' || path === '/profile') {
          navigate(-1)
        }
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
          savedMovie.isSaved = true
          setSavedMovies([...savedMovies, savedMovie])
          const localMovie = storagedMovies.find((m) => m.id === savedMovie.movieId)
          if (localMovie) {
            localMovie._id = savedMovie._id
            localMovie.isSaved = true
          }
          setDisabled(false)
      }
    })
      .then(() => {
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
    : items.filter((item) => item.duration <= SHORT_MOVIE_LENGTH)
  }

  function fetchAllMovies() {
    moviesApi.getMovies()
    .then((movies) => {
      setAllMovies(movies)
      const modifiedMovies = modifyAllMovies(movies, initialSavedMovies)
      const movieQuery = localStorage.getItem('movieQuery')
      const foundMovies = handleSearchFilter(modifiedMovies, movieQuery)
      const checkedShortMovies = handleCheckboxFilter(foundMovies, checked)
      if (checkedShortMovies.length === 0 || foundMovies.length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
        setMoviesError(false)
        localStorage.setItem('foundMovies', JSON.stringify(checkedShortMovies))
        localStorage.setItem('foundShortMovies', JSON.stringify(checkedShortMovies))
        setStoragedMovies(foundMovies)
      }
      setIsLoading(false)
      setMoviesError(false)
      })
      .catch((err) => {
        localStorage.removeItem('foundMovies')
        setMoviesError(true)
        setIsLoading(false)
        console.log(err.message)
      })
  }
  function onMoviesSearch(query) {
    setMoviesError(false)
    setIsLoading(true)
    localStorage.setItem('movieQuery', query.movieInput)
    localStorage.setItem('checkboxState', checked)
    if (allMovies.length === 0) {
      fetchAllMovies()
    } else {
      const modifiedMovies = modifyAllMovies(allMovies, savedMovies)
      const movieQuery = localStorage.getItem('movieQuery')
      const foundMovies = handleSearchFilter(modifiedMovies, movieQuery)
      const checkboxState = JSON.parse(localStorage.getItem('checkboxState'))
      const checkedShortMovies = handleCheckboxFilter(foundMovies, checkboxState)
      if (checkedShortMovies.length === 0 || foundMovies.length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
        setMoviesError(false)
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
        localStorage.setItem('foundShortMovies', JSON.stringify(checkedShortMovies))
        setStoragedMovies(foundMovies)
        setStoragedShortMovies(checkedShortMovies)
      }
      setTimeout(() => {setIsLoading(false)
      setMoviesError(false)}, 1000)
    }
  }

  function handleCheckboxChange() {
    setChecked(!checked)
    localStorage.setItem('checkboxState', !checked)
    const checkedShortMovies = handleCheckboxFilter(storagedMovies, !checked)
      if ((checkedShortMovies.length === 0) || 
        (!localStorage.getItem('foundShortMovies'))) {
        setNotFound(true)
      } else {
        setNotFound(false)
        setMoviesError(false)
        localStorage.setItem('foundShortMovies', JSON.stringify(checkedShortMovies))
        setStoragedShortMovies(checkedShortMovies)
      }
      setIsLoading(false)
      setMoviesError(false)
  }

  function onSavedMoviesSearch(query) {
    const searchedSavedMovies = handleSearchFilter(savedMovies, query.movieInput)
    const checkedShortSavedMovies = handleCheckboxFilter(searchedSavedMovies, savedChecked)
    if (checkedShortSavedMovies.length === 0) {
      setNotFound(true)
    } else {
      setNotFound(false)
      setMoviesError(false)
      setSearchedShortMovies(checkedShortSavedMovies)
    }
    return searchedSavedMovies
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <savedMoviesContext.Provider value={savedMovies}>
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
          searchedShortMovies={searchedShortMovies}
          setSearchedShortMovies={setSearchedShortMovies}
          notFound={notFound}
          component={SavedMovies}
          checked={savedChecked}
          onDelete={onDelete}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          setChecked={setSavedChecked}
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
      </savedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
