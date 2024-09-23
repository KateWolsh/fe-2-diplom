import { Button } from 'primereact/button';
import './style.css';
import { Tooltip } from 'primereact/tooltip';
import { IAvailableSeatsInfo, ITicketProps } from '../../types';
import { formatTime } from '../../helpers/formatTime';
import { useTicketContext } from '../../hooks/useTicketContext';

export const Ticket = ({ item, onSelectSeatsClick  }: ITicketProps) => {
    const { departure, arrival} = item;
    const { setSelectedTicket } = useTicketContext();

    const seatClasses: Array<keyof IAvailableSeatsInfo> = ["first", "second", "third", "fourth"];

    const combinedClickHandler = () => {
        setSelectedTicket(item);
        if (onSelectSeatsClick) {
          onSelectSeatsClick();
        }
      };
    return (
        <div className="ticket">
            <div className="info-train-container">
                <div className="info-train-departure">
                    <img className="train-icon" src="src/icons/train.svg" alt="icon-train" />
                    <span className="train-number">{departure.train.name}</span>
                </div>
                <div className="info-train-arrival">
                    <img className="train-icon" src="src/icons/train.svg" alt="icon-train" />
                    <span className="train-number">{arrival.train.name}</span>
                </div>
            </div>
            <div className="info-directions-container">
                <div className="departure">
                    <div className="info-direction-departure">
                        <span className="info-time-from">{formatTime(departure.from.datetime)}</span>
                        <span className="info-city-from">{departure.from.city.name}</span>
                        <span className="info-station-from">{departure.from.railway_station_name}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#C4C4C4" }} className="travel-time">
                        </span>
                        <img style={{width: "30px", height: "20px"}} src="src/icons/arrow.svg" alt="icon-train" />
                    </div>
                    <div className="info-direction-departure">
                        <span className="info-time-to">{formatTime(departure.to.datetime)}</span>
                        <span className="info-city-to">{departure.to.city.name}</span>
                        <span className="info-station-to">{departure.to.railway_station_name}</span>
                    </div>
                </div>
                <div className="arrival">
                    <div className="info-direction-arrival">
                        <span className="info-time-from">{formatTime(arrival.from.datetime)}</span>
                        <span className="info-city-from">{arrival.from.city.name}</span>
                        <span className="info-station-from">{arrival.from.railway_station_name}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#C4C4C4" }} className="travel-time">
                        </span>
                        <img style={{width: "30px", height: "20px"}} src="src/icons/arrow.svg" alt="icon-train" />
                    </div>
                    <div className="info-direction-arrival">
                        <span className="info-time-to">{formatTime(arrival.to.datetime)}</span>
                        <span className="info-city-to">{arrival.to.city.name}</span>
                        <span className="info-station-to">{arrival.to.railway_station_name}</span>
                    </div>
                </div>
            </div>
            <div className="vertical-line-ticket"></div>
            <div className="info-seats-container">
                {seatClasses.map((seatClass) => (
                    departure.available_seats_info[seatClass] !== undefined && (
                        <div className="item-info-seats" key={seatClass}>
                            <span style={{ color: '#3E3C41', fontSize: '16px'}} className="type-seat">
                                {seatClass === "first" ? "Люкс" :
                                seatClass === "second" ? "Купе" :
                                seatClass === "third" ? "Плацкарт" : "Сидячие"}
                            </span>
                            {/* <Tooltip target=".common-count-seats" content={`Места: ${departure.available_seats_info[seatClass]}`} className="tooltip-count-seats" /> */}
                            <span style={{ color: '#FFA800', fontSize: '16px'}} className="common-count-seats">
                                {departure.available_seats_info[seatClass]}
                            </span>
                            <div style={{marginTop: "-6px"}} className="ticket-price">
                                <span style={{ color: '#928F94', fontSize: '16px' }}>от </span>
                                <span style={{ color: '#2D2B2F', fontSize: '24px' }}>
                                    {departure.price_info[seatClass]?.bottom_price || departure.price_info[seatClass]?.price}
                                </span>
                                <span style={{ color: '#928F94', fontSize: '24px' }}>₽</span>
                            </div>
                        </div>
                    )
                ))}
                <Button 
                    className="btn-choose-seats"
                    label="Выбрать места" 
                    onClick={combinedClickHandler}
                />
            </div>
        </div>
    )
};


