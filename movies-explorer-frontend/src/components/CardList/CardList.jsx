import MoviePic from '../../images/movie.svg'
import Card from "../Card/Card"
import Preloader from '../Preloader/Preloader'
function CardList(props) {
  return (
    <section className="cards">
      <div className="cards__list">
        <Card img={MoviePic} title={'33 слова о дизайне'} duration={'1ч 47м'} saved={props.saved} ></Card>
        <Card img={MoviePic} title={'33 слова о дизайне'} duration={'1ч 47м'} saved={props.saved}></Card>
        <Card img={MoviePic} title={'33 слова о дизайне'} duration={'1ч 47м'} saved={props.saved}></Card>
        <Card img={MoviePic} title={'33 слова о дизайне'} duration={'1ч 47м'} saved={props.saved} ></Card>
        <Card img={MoviePic} title={'33 слова о дизайне'} duration={'1ч 47м'} saved={props.saved}></Card>
      </div>
      <button className={`cards__load-button ${props.saved ? 'cards__load-button_hidden' : ''}`} type='button'>Ещё</button>
      <Preloader hidden={true}></Preloader>
    </section>
  )
}

export default CardList;