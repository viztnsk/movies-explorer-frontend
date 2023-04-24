import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="footer">
      <h5 className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
      <div className="footer__container">
        <p className="footer__text footer__text_faded">© {new Date().getFullYear()}</p>
        <div className="footer__links">
          <Link className='footer__text' to='https://practicum.yandex.ru/web/' target="_blank">Яндекс.Практикум</Link>
          <Link className='footer__text' to='https://github.com/viztnsk' target="_blank">GitHub</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;