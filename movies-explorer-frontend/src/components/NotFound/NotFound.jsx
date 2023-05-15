import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate()
  return (
    <section className="not-found">
      <h1 className="not-found__heading">
        404
      </h1>
      <p className="not-found__subheading">Страница не найдена</p>
      <button type='button' className="not-found__return-button" onClick={() => navigate(-1)} >Назад</button>
    </section>

  )
}

export default NotFound;