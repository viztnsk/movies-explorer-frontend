import { useState, useEffect } from 'react';
import { mainApi } from '../../utils/MainApi';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState(props.savedMovies)
  const [notFound, setNotFound] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
			mainApi
				.getMovies()
				.then((savedMovies) => {
					setSavedMovies(savedMovies)
				})
				.catch((err) => {
					console.log(`Ошибка при загрузке данных с сервера: ${err}`)
				})
	}, [])

  function onSearch(query) {
    if (query === '') {
      setSavedMovies(props.savedMovies)
    }
    props.onSearch(query)
    setSavedMovies(props.onSearch(query))
  }

  function onDelete(movie) {
    const deletedMovie = props.savedMovies.find((item) => item._id === movie._id)
    if (deletedMovie) {
      mainApi.deleteMovie(deletedMovie._id)
      .then((deletedMovie) => {
        if (deletedMovie) {
          props.setSavedMovies(
          props.savedMovies.filter((m) => m._id !== deletedMovie._id)
        )}
        setSavedMovies(savedMovies.filter((m) => m._id !== deletedMovie._id))
      })
      .catch(err => console.log(`Что-то пошло не так: ${err.message}`))
    }
  }

  function handleCheckboxChange() {
    setChecked(!checked)
    let checkedShortMovies
    if (!checked === true) {
      checkedShortMovies = props.handleCheckboxFilter(savedMovies, !checked)
    } else {
      checkedShortMovies = props.handleCheckboxFilter(props.savedMovies, !checked)
    }
      if (checkedShortMovies.length === 0) {
        setNotFound(true)
        setSavedMovies([])
      } else {
        setNotFound(false)
        setSavedMovies(checkedShortMovies)
      }
  }
  return (
    <>
    <Header loggedIn={props.loggedIn}/>
    <main className='movies'>
    <SearchForm 
      onSearch={onSearch} 
      setChecked={setChecked} 
      checked={checked} 
      handleCheckboxChange={handleCheckboxChange}/>
    {notFound
      ? <div className='movies__error'>Ничего не найдено</div>
      : <CardList 
          saved={true} 
          searchedSavedMovies={props.searchedSavedMovies}
          savedMovies={savedMovies}
          onDelete={onDelete}/>}
    </main>
    <Footer/>
    </>
  )
}

export default SavedMovies;