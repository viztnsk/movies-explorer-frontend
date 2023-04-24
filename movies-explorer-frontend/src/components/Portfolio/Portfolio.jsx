import { Link } from 'react-router-dom';
function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__heading">
      Портфолио
      </h4>
      <div className='portfolio__container'>
        <div className='portfolio__links'>
          <Link to='https://viztnsk.github.io/how-to-learn/' className='portfolio__link' target="_blank">Статичный сайт</Link>
          <p className="portfolio__arrow">↗</p>
        </div>
        <div className='portfolio__links'>
          <Link to='https://viztnsk.github.io/russian-travel/' className='portfolio__link' target="_blank">Адаптивный сайт</Link>
          <p className="portfolio__arrow">↗</p>
        </div>
        <div className='portfolio__links'>
          <Link to='https://viztnsk.mesto.nomoredomains.work/' className='portfolio__link' target="_blank">Одностраничное приложение</Link>
          <p className="portfolio__arrow">↗</p>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;