import { Link } from 'react-router-dom';
function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__heading">
      Портфолио
      </h4>
      <ul className='portfolio__links'>
          <li className="portfolio__link">
            <Link to='https://viztnsk.github.io/how-to-learn/' className='link' target="_blank">
            <p className="link__text">Статичный сайт</p>
            <p className="link__arrow">↗</p>
            </Link>
          </li>
          <li className="portfolio__link">
            <Link to='https://viztnsk.github.io/russian-travel/' className='link' target="_blank">
            <p className="link__text">Адаптивный сайт</p>
            <p className="link__arrow">↗</p>
            </Link>
          </li>
          <li className="portfolio__link">
            <Link to='https://viztnsk.mesto.nomoredomains.work/' className='link' target="_blank">
              <p className="link__text">Одностраничное приложение</p>
              <p className="link__arrow">↗</p>
            </Link>
          </li>
      </ul>
    </section>
  )
}

export default Portfolio;