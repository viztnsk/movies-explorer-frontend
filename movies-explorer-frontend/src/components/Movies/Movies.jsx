import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
function Movies() {
  return (
    <>
    <main className='movies'>
    <SearchForm></SearchForm>
    <CardList></CardList>
    </main>
    <Footer></Footer>
    </>
  )
}

export default Movies;