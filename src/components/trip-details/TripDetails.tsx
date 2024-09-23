import './style.css'
import { useTicketContext } from '../../hooks/useTicketContext'
import { formatTime } from '../../helpers/formatTime';
import { useSearchContext } from '../../hooks/useSearchContext ';
import { getDuration } from '../../helpers/getDuration';
import { formatDate } from '../../helpers/formatDate'
import { useOrderContext } from '../../hooks/useOrderContext';
import { useEffect } from 'react';
import { calculatePrice } from '../../helpers/calculatePrice';

export const TripDetails = () => {
    const { selectedTicket } = useTicketContext()
    const { fromDate, toDate } = useSearchContext();
    const { typeOfCoachThirdDeparture, typeOfCoachThirdArrival } = useTicketContext()
    const { selectedDepartureSeats, selectedArrivalSeats, setTotalPrice, totalPrice, kidsCount, adultsCount } = useOrderContext()

    useEffect(() => {
        console.log('typeOfCoachThirdArrival', typeOfCoachThirdArrival);
        console.log('typeOfCoachThirdDeparture', typeOfCoachThirdDeparture);
      }, [typeOfCoachThirdArrival, typeOfCoachThirdDeparture]);
    console.log('selectedDepartureSeats', selectedDepartureSeats)
    console.log('selectedArrivalSeats', selectedArrivalSeats)
    console.log('price_info', selectedTicket?.departure.price_info)

    const departureFrom = new Date(selectedTicket.departure.from.datetime);
    const departureTo = new Date(selectedTicket.departure.to.datetime);
    const { hours: hoursThere, minutes: minutesThere } = getDuration(departureFrom, departureTo);

    const arrivalFrom = new Date(selectedTicket.arrival.from.datetime);
    const arrivalTo = new Date(selectedTicket.arrival.to.datetime);
    const { hours: hoursBack, minutes: minutesBack } = getDuration(arrivalFrom, arrivalTo);

    const departurePrice = calculatePrice(
        selectedDepartureSeats,
        typeOfCoachThirdDeparture,
        selectedTicket?.departure
    );

    const arrivalPrice = calculatePrice(
        selectedArrivalSeats,
        typeOfCoachThirdArrival,
        selectedTicket?.arrival
    );

    useEffect(() => {
        setTotalPrice(departurePrice + arrivalPrice);
    }, [departurePrice, arrivalPrice]);

    console.log('departurePrice', departurePrice)
    console.log('arrivalPrice', arrivalPrice)

    return (
        <div className="trip-detail-contsiner">
            <div className="trip-detail-header-container">
                <span className="trip-detail-header">ДЕТАЛИ ПОЕЗДКИ</span>
            </div>
            <div className="trip-detail-decore-line"></div>
            <div className="trip-detail-there-container">
                <div className="trip-detail-there-header">
                    <img src="src/icons/direct-to.svg"></img>
                    <span>Туда</span>
                    <span className="date-there">{formatDate(fromDate)}</span>
                </div>
                <div className="trip-detail-about-train">
                    <div className="number-train-header">
                        <span>№ Поезда</span>
                    </div>
                    <div className="number-train">
                        <span>{selectedTicket?.departure.train.name}</span>
                    </div>
                    <div className="name-train-header">
                        <span>Название</span>
                    </div>
                    <div className="name-train">
                        <span>{selectedTicket?.departure.train.name}</span>
                    </div>
                </div>
                <div className="times-in-way"> 
                    <span>{`${hoursThere} ч ${minutesThere} мин`}</span>
                    <img src="src/icons/arrow.svg"></img>
                </div>
                <div className="trip-detail-about-direction">
                    <div className="date-time-container from">
                        <span className="time">{formatTime(selectedTicket.departure.from.datetime)}</span>
                        <span className="date"></span>
                    </div>
                    <div className="date-time-container to">
                        <span className="time">{formatTime(selectedTicket.departure.to.datetime)}</span>
                        <span className="date"></span>
                    </div>
                    <div className="spots-name-container from">
                        <span className="city">{selectedTicket?.departure.from.city.name}</span>
                        <span className="station">{selectedTicket?.departure.from.railway_station_name}</span>
                    </div>
                    <div className="spots-name-container to">
                        <span className="city">{selectedTicket?.departure.to.city.name}</span>
                        <span className="station">{selectedTicket?.departure.to.railway_station_name}</span>
                    </div>
                </div>
            </div>
            <div className="trip-detail-decore-line"></div>
            <div className="trip-detail-back-container">
                <div className="trip-detail-there-header">
                    <img src="src/icons/direct-to.svg"></img>
                    <span>Обратно</span>
                    <span className="date-there">{formatDate(toDate)}</span>
                </div>
                <div className="trip-detail-about-train">
                    <div className="number-train-header">
                        <span>№ Поезда</span>
                    </div>
                    <div className="number-train">
                        <span>{selectedTicket?.arrival.train.name}</span>
                    </div>
                    <div className="name-train-header">
                        <span>Название</span>
                    </div>
                    <div className="name-train">
                        <span>{selectedTicket?.arrival.train.name}</span>
                    </div>
                </div>
                <div className="times-in-way"> 
                    <span>{`${hoursBack} ч ${minutesBack} мин`}</span>
                    <img src="src/icons/arrow.svg"></img>
                </div>
                <div className="trip-detail-about-direction">
                    <div className="date-time-container from">
                        <span className="time">{formatTime(selectedTicket?.arrival.from.datetime)}</span>
                        <span className="date"></span>
                    </div>
                    <div className="date-time-container to">
                        <span className="time">{formatTime(selectedTicket.arrival.to.datetime)}</span>
                        <span className="date"></span>
                    </div>
                    <div className="spots-name-container from">
                        <span className="city">{selectedTicket?.arrival.from.city.name}</span>
                        <span className="station">{selectedTicket?.arrival.from.railway_station_name}</span>
                    </div>
                    <div className="spots-name-container to">
                        <span className="city">{selectedTicket?.arrival.to.city.name}</span>
                        <span className="station">{selectedTicket?.arrival.to.railway_station_name}</span>
                    </div>
                </div>
            </div>
            <div className="trip-detail-decore-line"></div>
            <div className="about-passengers-container">
                <div className="about-passengers-header">
                    <img src="src/icons/passenger.svg"></img>
                    <span>Пассажиры</span>
                </div>
                <div className="price-adults-kids-container">
                    <div className="adults-kids-header">
                        <span className="adults">{adultsCount} Взрослых</span>
                        <span className="count">{kidsCount} Ребенок</span>
                    </div>
                    <div className="price-kids-adults">
                        {/* <span className="kids">5 840 ₽</span>
                        <span className="count">5 840 ₽</span> */}
                    </div>
                </div>
            </div>
            <div className="trip-detail-decore-line"></div>
            <div className="common-price">
                    <span className="common-price-header">ИТОГ</span>
                    <span className="common-price-count">{totalPrice} ₽</span>
            </div>
        </div>
    )
}