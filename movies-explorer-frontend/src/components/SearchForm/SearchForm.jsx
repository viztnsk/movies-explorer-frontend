import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const path = useLocation().pathname;
  const localData = localStorage.getItem('movieQuery')
  const prevQuery = localData 
    ? localData 
    : ''
  const [query, setQuery] = useState(prevQuery || '')
  const methods = useForm({
    mode: 'onBlur'
  }); 
  const handleSubmit = (query) => {
    props.onSearch(query)
  }
  const validation = (path === '/movies' ? {
    required: 'Нужно ввести ключевое слово',
  } : {})

  return (
    <section className="search">
      <form  onSubmit={methods.handleSubmit(handleSubmit)} className='search__form' name='movie'>
        <input 
          className='search__input' 
          type="text" 
          placeholder={methods.formState.errors?.movieInput ? 'Нужно ввести ключевое слово': 'Фильм'}
          name='movieInput'
          id='movie-input'
          defaultValue={path === '/movies' 
          ? query
          : ''}
          onChange={e => setQuery(e.target.value)}
          {...methods.register("movieInput", validation)} 
        />
        <button className="search__button" type='submit' 
        ></button>
        <FilterCheckbox handleCheckboxChange={props.handleCheckboxChange}
        onSearch={props.onSearch} 
        query={query} setChecked={props.setChecked} checked={props.checked}/> 
      </form>
       {/* <span className='profile__error'
      >Нужно ввести ключевое слово
      </span> */}
    </section>
  )
}

export default SearchForm;