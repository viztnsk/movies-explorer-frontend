import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
function SavedMovies(props) {
  return (
    <>
    <main className='movies'>
    <SearchForm></SearchForm>
    <CardList saved={true}></CardList>
    </main>
    <Footer></Footer>
    </>
  )
}

export default SavedMovies;