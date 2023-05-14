// import { useState, useEffect } from 'react';
// import { mainApi } from '../../utils/MainApi';
// import { moviesApi } from '../../utils/MoviesApi';
// import CardList from '../CardList/CardList';
// import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
// import Preloader from '../Preloader/Preloader';
// import SearchForm from '../SearchForm/SearchForm';

// function Movies(loggedIn, setIsLoading, handleSearchFilter, handleCheckboxFilter, handleCheckboxChange, ...props) {
//   const [allMovies, setAllMovies] = useState([])
//   const [savedMovies, setSavedMovies] = useState([])
//   const [searchedMovies, setSearchedMovies] = useState([])
//   const [notFound, setNotFound] = useState(false)
//   const [checked, setChecked] = useState(false)
//   const [moviesError, setMoviesError] = useState(false)

//   // const searchedMovies = JSON.parse(localStorage.getItem('foundMovies'))

//   useEffect(() => {
//     Promise.all([
//       moviesApi.getMovies(),
//       mainApi.getMovies()
//     ])
//       .then(([receivedMovies, receivedSavedMovies ]) => {
//         setSavedMovies(receivedSavedMovies)
//         receivedMovies.forEach((movie) => {
//           movie._id = null
//           receivedSavedMovies.forEach((savedMovie) => {
//             if (savedMovie.movieId === movie.id) {
//               movie._id = savedMovie.movieId
//             }
//           })
//           setAllMovies(allMovies => [...allMovies, movie])
//           })
//         })
//       .catch(err => console.log(`Ошибка при загрузке данных с сервера на UseEffect: ${err}`))
//   }, [])

//   function onSave(movie, user) {
//     mainApi.saveMovie(movie, user)
//     .then((movie) => {
//       if (movie in savedMovies === false) {setSavedMovies([movie, ...savedMovies])}
//     })
//     .then(() => console.log(savedMovies))
//     .catch((err) => console.log(`Что-то пошло не так: ${err}`))
//   }
//   function onDelete(movie) {
//     const deletedMovie = savedMovies.find((item) => item.movieId === movie.movieId)
//     if (deletedMovie) {
//       // mainApi.deleteMovie(deletedMovie.movie.movieId || deletedMovie.movie.id)
//       // .then(() => {
//       //   setSavedMovies(
//       //     savedMovies.filter((m) => m._movieId !== deletedMovie.movieId)
//       //   ) 
//       // })
//       // .catch(err => console.log(`Что-то пошло не так: ${err}`))
//       console.log(deletedMovie)
//     }
//     console.log(movie)
//     console.log('deleted')
//   }

//   function onMoviesSearch(query) {
//     setIsLoading(true)
//     localStorage.setItem('movieQuery', query.movieInput)
//     localStorage.setItem('checkboxState', checked)
//     moviesApi.getMovies()
//     .then((movies) => {
//       const movieQuery = localStorage.getItem('movieQuery').toLowerCase()
//       const searchedMovies = handleSearchFilter(movies, movieQuery)
//       setSearchedMovies(searchedMovies)
//     const checkboxState = JSON.parse(localStorage.getItem('checkboxState'))
//       const checkedShortMovies = handleCheckboxFilter(searchedMovies, checkboxState)
//       if (checkedShortMovies.length === 0) {
//         setNotFound(true)
//       } else {
//         setNotFound(false)
//         setMoviesError(false)
//         localStorage.setItem('foundMovies', JSON.stringify(checkedShortMovies))
//       }
//       setIsLoading(false)
//       setMoviesError(false)
//     })
//       .then(() => {
//         console.log(JSON.parse(localStorage.getItem('foundMovies')))
//       })
//       .catch((err) => {
//         localStorage.removeItem('foundMovies')
//         setMoviesError(true)
//         setIsLoading(false)
//       })
//   }

  
//   return (
//     <>
//     <Header loggedIn={loggedIn}/>
//     <main className='movies'>
//     <SearchForm onSearch={onMoviesSearch} setChecked={props.setChecked} checked={checked} handleCheckboxChange={handleCheckboxChange}
//     />
//     {props.isLoading && <Preloader />}
//     {props.notFound
//     ? <div className='movies__error'>Ничего не найдено</div>
//     : <CardList 
//       isLoading={props.isLoading} 
//       movies={searchedMovies} 
//       saved={props.saved}
//       setSaved={props.setSaved}
//       savedMovies={props.savedMovies} 
//       onSave={onSave} 
//       onDelete={onDelete}/> }
//     {props.moviesError && <div className='movies__error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div>}
//     </main>
//     <Footer/>
//     </>
//   )
// }

// export default Movies;