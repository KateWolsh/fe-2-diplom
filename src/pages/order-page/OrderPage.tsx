import './style.css'
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import SearchTickets from '../../components/search-tickets/SearchTickets'
import { SearchTicketsWithFilters } from '../../components/search-tickets-with-fiters/SearchTicketsWithFilters'
import { Tickets } from '../../components/ticket/Tickets'
import { useSearchContext } from '../../hooks/useSearchContext ';
import { useState, useEffect } from 'react'
import { IItem } from '../../types'
import { LastTickets } from '../../components/last-tickets/LastTikets'
import { SelectSeats } from '../../components/select-seats/SelectSeats'
import { getTickets } from '../../api/getTickets'
import { Button } from 'primereact/button'
import { PassengerCards } from '../../components/passenger-cards/PassengerCards'
import { TripDetails } from '../../components/trip-details/TripDetails'
import { DirectionProvider } from '../../hooks/useDirectionContext'
import { useOrderStepContext } from '../../hooks/useOrderStepContext'

const OrderPage = () => {

  const { fromDate, toDate, filters, fromCity, toCity, priceFrom, priceTo, departure, arrival } = useSearchContext();

  const { currentStep, setCurrentStep } = useOrderStepContext();

  const [tickets, setTickets] = useState<IItem[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<IItem | null>(null);
  const [showSelectSeats, setShowSelectSeats] = useState<boolean>(false);
  const [showPassengerCards, setShowPassengerCards] = useState<boolean>(false);
  const [showTripDetails, setShowTripDetails] = useState<boolean>(false);

  const handleSelectSeatsClick = (ticket: IItem) => {
    setSelectedTicket(ticket);
    setShowSelectSeats(true); 
  };

  const handleShowPassengerCards = () => {
    setShowSelectSeats(false);
    setShowPassengerCards(true);
    setShowTripDetails(true);
    setCurrentStep(2);
  };

  const buildParams = () => {
    return {
      from_city_id: fromCity?._id,
      to_city_id: toCity?._id,
      date_start: fromDate?.toISOString().split('T')[0],
      date_end: toDate?.toISOString().split('T')[0],
      price_from: priceFrom,
      price_to: priceTo,
      ...(filters.have_wifi && { have_wifi: filters.have_wifi }),
      ...(filters.have_first_class && { have_first_class: filters.have_first_class }),
      ...(filters.have_second_class && { have_second_class: filters.have_second_class }),
      ...(filters.have_third_class && { have_third_class: filters.have_third_class }),
      ...(filters.have_fourth_class && { have_fourth_class: filters.have_fourth_class }),
      ...(filters.have_express && { have_express: filters.have_express }),
      ...(departure?.startDepartureHourFrom && { start_departure_hour_from: departure.startDepartureHourFrom }),
      ...(departure?.startDepartureHourTo && { start_departure_hour_to: departure.startDepartureHourTo }),
      ...(departure?.endDepartureHourFrom && { end_departure_hour_from: departure.endDepartureHourFrom }),
      ...(departure?.endDepartureHourTo && { end_departure_hour_to: departure.endDepartureHourTo }),
      ...(arrival?.startArrivalHourFrom && { start_arrival_hour_from: arrival.startArrivalHourFrom }),
      ...(arrival?.startArrivalHourTo && { start_arrival_hour_to: arrival.startArrivalHourTo}),
      ...(arrival?.endArrivalHourFrom && { end_arrival_hour_from: arrival.endArrivalHourFrom}),
      ...(arrival?.endArrivalHourTo && { end_arrival_hour_to: arrival.endArrivalHourTo}),
    };
  };

  console.log('price_from', priceFrom)
  useEffect(() => {
    const fetchFilteredTickets = async () => {
      const params = buildParams();
      console.log("Выполнение запроса с параметрами:", params);

      try {
        const fetchedTickets = await getTickets(params);
        console.log("Полученные данные:", fetchedTickets);
        setTickets(fetchedTickets);
      } catch (error) {
        console.error("Ошибка при запросе:", error);
        // setError('Ошибка при загрузке билетов. Попробуйте позже.');
      } finally {
        // setLoading(false); // Останавливаем индикатор загрузки после завершения запроса
      }
    };

    fetchFilteredTickets();
  }, [
    fromDate, 
    toDate,
    fromCity,
    toCity,
    filters.have_wifi, 
    filters.have_first_class, 
    filters.have_second_class, 
    filters.have_third_class, 
    filters.have_fourth_class, 
    filters.have_express,
    priceFrom,
    priceTo,
    departure?.startDepartureHourFrom,
    departure?.startDepartureHourTo,
    departure?.endDepartureHourFrom,
    departure?.endDepartureHourTo, 
    arrival?.startArrivalHourFrom,
    arrival?.startArrivalHourTo,
    arrival?.endArrivalHourFrom,
    arrival?.endArrivalHourTo
  ]);

  return (
    <div className="order-page">
      <div className="header-container-order">
        <img src="../src/img/baner-order.png" alt="Фоновое изображение" className="baner-order"></img>
        <Navbar />
        <SearchTickets />
      </div>
      <div className="step-container">
        <button className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <span className="step-img" >①</span>
          <span className="step-name">Билеты</span>
         </button>
        <button className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <span className="step-img">②</span>
          <span className="step-name">Пассажиры</span>
        </button>
        <button className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <span className="step-img">③</span>
          <span className="step-name">Оплата</span>
        </button>
        <button className={`step ${currentStep >= 4 ? 'active' : ''}`}>
          <span className="step-img">④</span>
          <span className="step-name">Проверка</span>
        </button>
      </div>
      <div className="content-order-container">
        <div className="section-search">
          {showTripDetails ? (
               <TripDetails />
            ) : (
              <SearchTicketsWithFilters />
            )}
          <LastTickets />
        </div>
        <div className="content-order">
          {showPassengerCards ? (
                <PassengerCards />
          ) : showSelectSeats ? (
              <div className="select-seats-common-container">
                {selectedTicket && (
                  <>
                    <DirectionProvider> 
                      <SelectSeats directionType="departure" direction={selectedTicket.departure} />
                    </DirectionProvider> 
                    <DirectionProvider> 
                      <SelectSeats directionType="arrival" direction={selectedTicket.arrival} />
                    </DirectionProvider> 
                      <Button label="Далее" className="btn-main" onClick={handleShowPassengerCards} />
                  </>
                )}
              </div>
          ) : (
            tickets && (
              <Tickets 
                items={tickets}
                onSelectSeatsClick={handleSelectSeatsClick}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderPage
