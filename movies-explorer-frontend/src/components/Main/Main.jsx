import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';


function Main(props) {
  return (
  <>
    <main className='main'>
      <Header loggedIn={props.loggedIn}></Header>
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>  
    </main>
    <Footer></Footer>
  </>
  );
}

export default Main;
