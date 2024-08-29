
import '../home-page/home-page-style.css'

function AboutUs() {

  return (
      <section className="about-us">
        <span className="header-about-us">О НАС</span>
        <div className="content-container">
          <div className="vertical-line"></div>
          <p className="content-about-us">
            Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем
            все больше людей заказывают жд билеты через интернет.

            <br /> <br />Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?
            Мы расскажем о преимуществах заказа через интернет.

            <br /> <br />Покупать жд билеты дешево можно за 90 суток до отправления поезда.
            Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
            </p>
        </div>
      </section>
  )
}

export default AboutUs
