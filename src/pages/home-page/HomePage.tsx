import Footer from "../../components/footer/Footer.tsx";
import Navbar from "../../components/navbar/Navbar"
import SearchForm from "../../components/search-tickets/SearchTickets.tsx"
import './style.css'
import AboutUs from "../home-page/about-us/AboutUs.tsx";
import HowItWorks from "../home-page/how-it-works/HowItWorks.tsx";
import Reviews from "../home-page/reviews/Reviews.tsx";
import MainBanner from "../../img/MainBanner.png"

export const HomePage = () => {

  return (
    <div className="home-page">
      <div className="header-container">
        <img src={MainBanner} alt="Фоновое изображение" className="main-banner"></img>
        <Navbar />
        <SearchForm/>
      </div>
      <div className="yellow-strip"></div>
      <div id="about-us">
        <AboutUs />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
