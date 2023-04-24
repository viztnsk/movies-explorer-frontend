function Techs() {
  return (
    <section className="techs">
      <h2 className='techs__heading'>Технологии</h2>
      <div className='techs__info'>
      <h3 className="techs__subheading">7 технологий</h3>
      <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <article className="techs__container">
        <p className="techs__type">HTML</p>
        <p className="techs__type">CSS</p>
        <p className="techs__type">JS</p>
        <p className="techs__type">React</p>
        <p className="techs__type">Git</p>
        <p className="techs__type">Express.js</p>
        <p className="techs__type">mongoDB</p>
      </article>
    </section>
  )
}

export default Techs;