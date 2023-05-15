import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const searchedMovies = JSON.parse(localStorage.getItem('foundMovies'))
  return (
    <>
    <Header loggedIn={props.loggedIn}/>
    <main className='movies'>
    <SearchForm 
      onSearch={props.onSearch} 
      setChecked={props.setChecked} 
      checked={props.checked} 
      handleCheckboxChange={props.handleCheckboxChange}
    />
    {props.isLoading && <Preloader />}
    {props.notFound
      ? <div className='movies__error'>Ничего не найдено</div>
      : <CardList 
          isLoading={props.isLoading} 
          movies={searchedMovies} 
          saved={props.saved}
          setSaved={props.setSaved}
          savedMovies={props.savedMovies} 
          onSave={props.onSave} 
          onDelete={props.onDelete}
          disabled={props.disabled}
        />}
      {props.moviesError && 
        <div className='movies__error'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>}
    </main>
    <Footer/>
    </>
  )
}

export default Movies;