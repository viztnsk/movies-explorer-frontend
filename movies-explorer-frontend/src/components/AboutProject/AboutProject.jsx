function AboutProject() {
  return (
    <section className="project">
      <h2 className='project__heading'>О проекте</h2>
      <div className="project__info">
        <article className="project__info_type_about">
          <h3 className="project__subheading">Дипломный проект включал 5 этапов</h3>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="project__info_type_time">
        <h3 className="project__subheading">На выполнение диплома ушло 5 недель</h3>
        <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <article className="project__timeline">
        <div className="timeline__block">
          <p className="timeline__text timeline__text_type_backend">1 неделя</p>
          <p className="timeline__text timeline__text_type_frontend">4 недели</p>
        </div>
        <div className="timeline__block">
          <p className="timeline__subtext timeline__subtext_type_backend">Back-end</p>
          <p className="timeline__subtext timeline__subtext_type_frontend">Front-end</p>
      </div>
      </article>
    </section>
  )
}

export default AboutProject;