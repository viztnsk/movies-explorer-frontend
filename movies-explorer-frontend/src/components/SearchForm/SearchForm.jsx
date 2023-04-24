import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search">
      <form  className='search__form' name='movie'>
        <input className='search__input' type="text" placeholder='Фильм' required/>
        <button className="search__button" type='submit'></button>
        <FilterCheckbox></FilterCheckbox> 
      </form>
    </section>
  )
}

export default SearchForm;