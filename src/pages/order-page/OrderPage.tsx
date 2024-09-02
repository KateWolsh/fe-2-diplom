import './style.css'
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import SearchTickets from '../../components/search-tickets/SearchTickets'
import SearchTicketsWithFilters from '../../components/search-tickets-with-fiters/SearchTicketsWithFilters'
// import LastTickets from '../../components/last-tickets/LastTikets'
// import InfoAboutPassenger from '../../components/info-about-passenger/InfoAboutPassenger'
import Ticket from '../../components/ticket/Ticket'
import { useSearchContext } from '../../hooks/useSearchContext ';
import { useEffect } from 'react'
import { SelectSeats } from '../../components/select-seats/SelectSeats'

const OrderPage = () => {
  const { fromDate, toDate, filters, fromCity, toCity } = useSearchContext();
  const {
    priceFrom, priceTo, startDepartureHourFrom, startDepartureHourTo,
    startArrivalHourFrom, startArrivalHourTo, endDepartureHourFrom, endDepartureHourTo,
    endArrivalHourFrom, endArrivalHourTo
  } = useSearchContext();

    useEffect(() => {
      const buildParams = () => {
        return {
          from_city_id: fromCity?._id,
          to_city_id: toCity?._id,
          fromDate: fromDate,
          toDate: toDate,
          price_from: priceFrom,
          price_to: priceTo,
          start_departure_hour_from: startDepartureHourFrom,
          start_departure_hour_to: startDepartureHourTo,
          start_arrival_hour_from: startArrivalHourFrom,
          start_arrival_hour_to: startArrivalHourTo,
          end_departure_hour_from: endDepartureHourFrom,
          end_departure_hour_to: endDepartureHourTo,
          end_arrival_hour_from: endArrivalHourFrom,
          end_arrival_hour_to: endArrivalHourTo,
          ...filters
        };
      };
    
      const fetchFilteredTickets = async () => {
        const params = buildParams();
        console.log("Выполнение запроса с параметрами:", params);
        const queryString = new URLSearchParams(params as any).toString();
        const url = `https://students.netoservices.ru/fe-diplom/routes?${queryString}`;
    
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Ошибка ${response.status}`);
          }
        const data = await response.json();
        console.log("Полученные данные:", data);
        // Здесь можно обновить состояние с данными
        } catch (error) {
          console.error("Ошибка при запросе:", error);
        }
      };
    
      fetchFilteredTickets();
    }, [
      priceFrom,
      priceTo,
      startDepartureHourFrom,
      startDepartureHourTo,
      startArrivalHourFrom,
      startArrivalHourTo,
      endDepartureHourFrom,
      endDepartureHourTo,
      endArrivalHourFrom,
      endArrivalHourTo,
      filters,
      fromDate, 
      toDate,
      fromCity,
      toCity
    ]);
  return (
    <div className="order-page">
      <div className="header-container-order">
        <img src="../src/img/baner-order.png" alt="Фоновое изображение" className="baner-order"></img>
        <Navbar />
        <SearchTickets />
      </div>
      <div className="step-container">
        <button className="step">① Билеты</button>
        <button className="step">② Пассажиры</button>
        <button className="step">③ Оплата</button>
        <button className="step">④ Проверка</button>
      </div>
      <div className='content-order'>
        <SearchTicketsWithFilters />
        <SelectSeats />
      </div>
      <Ticket />
      {/* <LastTickets /> */}
      {/* <InfoAboutPassenger /> */}
      <Footer />
    </div>
  )
}

export default OrderPage