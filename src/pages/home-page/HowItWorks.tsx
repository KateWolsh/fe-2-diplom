import '../home-page/home-page-style.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

function HowItWorks() {

  return (
      <section className="how-it-works">
        <div className="container-how-it-works">
          <div className="container-header">
            <span className="header-how-it-works">КАК ЭТО РАБОТАЕТ</span>
            <Button className='primary' label="Узнать больше" outlined />
          </div>
          <div className="how-it-works-items">
            <div className="how-it-works-item">
              <div className="how-it-works-img">
              <i className="pi pi-desktop icon-works" style={{ fontSize: '6rem', color: '#FFA800' }}></i>
              </div>
              <span className="how-it-works-text">Удобный заказ на сайте</span>
            </div>
            <div className="how-it-works-item">
              <div className="how-it-works-img">
              <i className="pi pi-building icon-works" style={{ fontSize: '6rem', color: '#FFA800' }}></i>
              </div>
              <span className="how-it-works-text">Нет необходимости ехать в офис</span>
            </div>
            <div className="how-it-works-item">
              <div className="how-it-works-img">
              <i className="pi pi-globe icon-works" style={{ fontSize: '6rem', color: '#FFA800' }}></i>
              </div>
              <span className="how-it-works-text">Огромный выбор направлений</span>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HowItWorks
