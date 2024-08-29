import Footer from "../../components/footer/Footer.tsx";
import Navbar from "../../components/navbar/Navbar"
import SearchForm from "../../components/search-tickets/SearchTickets.tsx"
import '../home-page/home-page-style.css'
import AboutUs from "./AboutUs.tsx";
import HowItWorks from "./HowItWorks.tsx";
import Reviews from "./Reviews.tsx";
import MainBanner from "../../img/MainBanner.png"



function HomePage() {


  return (
    <div className="home-page">
      <div className="header-container">
        <img src={MainBanner} alt="Фоновое изображение" className="main-banner"></img>
        <Navbar />
        <SearchForm/>
      </div>
      <div className="yellow-strip"></div>
      <AboutUs />
      <HowItWorks />
      <Reviews />
      <Footer />
    </div>
  )
}

export default HomePage
