import Footer from "../../components/footer/Footer.tsx";
import Navbar from "../../components/navbar/Navbar"
import '../home-page/style.css'
import './style.css'
import EmptyBanner from "../../img/empty-banner.svg"
import { OrderConfirmation } from "../../components/order-confirmation/OrderConfirmation.tsx";

export const EmptyPage = () => {

  return (
    <div className="home-page empty-page">
      <div className="header-container">
        <img src={EmptyBanner} alt="Фоновое изображение" className="main-banner"></img>
        <Navbar />
      </div>
      <div className="yellow-strip"></div>
      <div className="orderConfirmation-container">
        <span className="thanks">Благодарим Вас за заказ!</span>
        <OrderConfirmation />
      </div>
      <Footer />
    </div>
  )
}

export default EmptyPage
