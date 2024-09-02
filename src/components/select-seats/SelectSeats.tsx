import { Button } from 'primereact/button';
import './style.css'

export const SelectSeats = () => {
    return (
        <div className="select-seats-container">
            <div className="another-train-container">
                <img className="back-icon" src="src/icons/back.svg" alt="back" />
                <Button label="Выбрать другой поезд" className="primary btn-another-train" />
            </div>
            <div className="about-train" style={{ display: "flex", backgroundColor: "#F7F6F6" }} >
                <div style={{ display: "flex"}} className="number-express-train">
                    <img className="icon-train" style={{ color: "#FFA80", width: "30px", height: "30px"}} src="src/icons/train-orrange.svg" alt="icon-train" />
                    <div className="container">
                        <span className="number-train">116С</span>
                        <span className="express"></span>
                    </div>
                </div>
                <div style={{ display: "flex"}} className="about-direct">
                <div style={{ display: "flex", flexDirection: "column"}} className="direction-arrival">
                    <span className="time-from">00:10</span>
                    <span className="city-from">Москва</span>
                    <span className="station-from">Курский вокзал</span>
                </div>
                <img style={{width: "30px", height: "20px"}} src="src/icons/arrow.svg" alt="icon-train" />
                <div style={{ display: "flex", flexDirection: "column"}} className="direction-departure">
                    <span className="time-to">09:52</span>
                    <span className="city-to">Санкт-Петербург</span>
                    <span className="station-to">Ладожский вокзал</span>
                </div>
            </div>
            <div style={{ display: "flex"}} className="about-time">
                <img className="" style={{ color: "#FFA80", width: "30px", height: "30px"}} src="src/icons/time.svg" alt="icon-train" />
                    <div style={{ display: "flex", flexDirection: "column"}} className="container">
                        <span className="hour">9 часов </span>
                        <span className="minutes">42 минуты</span>
                    </div>
            </div>
            </div>
        </div>
    )
};