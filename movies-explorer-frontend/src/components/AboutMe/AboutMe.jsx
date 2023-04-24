import { Link } from 'react-router-dom';
import Selfie from '../../images/me-pic.jpg';
import Portfolio from '../Portfolio/Portfolio';
function AboutMe() {
  return (
    <section className="me">
      <h2 className="me__heading">Студент</h2>
      <article className="me__info">
        <img src={Selfie} alt="Selfie" className="me__pic" />
        <div className="me__container">
        <h3 className="me__name">Виктория</h3>
        <p className="me__work">Фронтенд-разработчица, 20 лет</p>
        <p className="me__about">Я родилась и живу в Москве, заканчиваю программу «Медиакоммуникации» в НИУ ВШЭ по направлению «Сторителлинг». Я люблю заниматься спортом и вести активный образ жизни, а мои хобби – посещение музеев и выставок, а также готовка и выпечка. Год назад начала кодить. Прошла курс «Веб-разработчик» от Яндекс Практикума и нахожусь в процессе поиска стажировки.</p>
        <Link className="me__git" to='https://github.com/viztnsk' target="_blank">GitHub</Link>
        </div>
      </article>
      <Portfolio></Portfolio>
    </section>
  )
}

export default AboutMe;