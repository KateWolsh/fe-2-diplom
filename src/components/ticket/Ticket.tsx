import { Button } from 'primereact/button';
import './style.css';
import { Tooltip } from 'primereact/tooltip';


export const Ticket = () => {
    return (
        <div className="ticket" style={{ position: "relative" }}>
            <div className="info-train-container">
                <img className="train-icon" style={{width: "86px", height: "86px"}} src="src/icons/train.svg" alt="icon-train" />
                <span className="train-number">116С</span>
                <div className="info-direction-train"></div>
            </div>
            <div className="info-directions-container">
                <div className="there-direction">
                    <div className="info-direction-arrival">
                        <span className="info-time-from">00:10</span>
                        <span className="info-city-from">Москва</span>
                        <span className="info-station-from">Курский вокзал</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#C4C4C4" }} className="travel-time">9 : 42</span>
                        <img style={{width: "30px", height: "20px"}} src="src/icons/arrow.svg" alt="icon-train" />
                    </div>
                    <div className="info-direction-departure">
                        <span className="info-time-to">09:52</span>
                        <span className="info-city-to">Санкт-Петербург</span>
                        <span className="info-station-to">Ладожский вокзал</span>
                    </div>
                </div>
                <div className="from-there-direction">
                    <div className="info-direction-arrival">
                        <span className="info-time-from">00:10</span>
                        <span className="info-city-from">Москва</span>
                        <span className="info-station-from">Курский вокзал</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#C4C4C4" }} className="travel-time">9 : 42</span>
                        <img style={{width: "30px", height: "20px", transform: "scaleX(-1)"}} src="src/icons/arrow.svg" alt="icon-train" />
                    </div>
                    <div className="info-direction-departure">
                        <span className="info-time-to">09:52</span>
                        <span className="info-city-to">Санкт-Петербург</span>
                        <span className="info-station-to">Ладожский вокзал</span>
                    </div>
                </div>
            </div>
            <div className="vertical-line"></div>
            <div style={{ position: "relative" }} className="info-seats-container">
                <div style={{ display: "flex"}} className="item-info-seats">
                    <span style={{ color: '#3E3C41', fontSize: '16px', marginRight: "35px" }} className="type-seat">Купе</span>
                    <span style={{ color: '#FFA800', fontSize: '16px', marginRight: "55px" }} className="common-count-seats">90</span>
                    <div style={{marginTop: "-6px"}} className="ticket-price">
                            <span style={{ color: '#928F94', fontSize: '16px' }}>от </span>
                            <span style={{ color: '#2D2B2F', fontSize: '24px' }}>1920</span>
                            <span style={{ color: '#928F94', fontSize: '24px' }}>₽</span>
                        </div>
                </div>
                <div className="avalable-filters-container">
                    <img  src="" alt="icon-filter" />
                </div>
                <Button 
                    style={{ 
                    position: "absolute", 
                    bottom: "12", 
                    right: "6", 
                    margin: "10px",
                    color: "white",
                    background: "#FFA800"
                    }}
                    label="Выбрать места" />
            </div>

        </div>

    )
};

export default Ticket;
