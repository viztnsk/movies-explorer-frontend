function FilterCheckbox(props) {

  const onChange = () => {
    props.handleCheckboxChange()
  }
  
  return (
    <section className="checkbox">
      <label className="checkbox__label">
        <input type="checkbox" className="checkbox__button" name='checkbox'
        onChange={onChange}
        defaultValue={false}
        checked={props.checked}/>
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox;