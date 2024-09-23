import { Button } from 'primereact/button';
import './style.css'
import { InputText } from 'primereact/inputtext';
import { TypeOfCoach } from './type-of-coach/TypeOfCoach'
import { formatTime } from '../../helpers/formatTime'
import { getDuration } from '../../helpers/getDuration';
import { getSeats } from '../../api/getSeats'
import { useEffect, useState } from 'react';
import { useSearchContext } from '../../hooks/useSearchContext '
import { ICoachInfo, ISelectedSeatsProps } from '../../types';
import { useOrderContext } from '../../hooks/useOrderContext'
import { useDirectionContext } from '../../hooks/useDirectionContext';
  
export const SelectSeats = ( {direction, directionType}: ISelectedSeatsProps) => {

    const { _id, train, from, to } = direction;
    const { hours, minutes } = getDuration(from.datetime, to.datetime);
    const { filters } = useSearchContext()
    const [coaches, setCoaches] = useState([])
    const [availableSeats, setAvalableSeats] = useState(0)
    const [adultsTicketsCount, setAdultsTicketsCount] = useState(0);
    const [kidsTicketsCount, setKidsTicketsCount] = useState(0);

    const { setAdultsCount, setKidsCount } = useOrderContext();
    const { setIsArrival, setIsDeparture } = useDirectionContext()

    const buildParams = () => {
       return {
        ...(filters.have_wifi && { have_wifi: filters.have_wifi }),
        ...(filters.have_express && { have_express: filters.have_express })    
        }
    }

    useEffect(() => {
        const fetchAvalableSeats = async () => {

        console.log("Выполнение запроса сколько сидений:", _id, buildParams());

        try {
            const fetchedCoaches = await getSeats(_id, buildParams());
            console.log("Полученные данные сидений:", fetchedCoaches);
            setCoaches(fetchedCoaches);
            if (fetchedCoaches.length > 0) {
                setAvalableSeats(fetchedCoaches[0].seats.length);
            }
        } catch (error) {
            console.error("Ошибка при запросе:", error);
            // setError('Ошибка при загрузке билетов. Попробуйте позже.');
        } finally {
            // setLoading(false); // Останавливаем индикатор загрузки после завершения запроса
        }
        };

        fetchAvalableSeats();

    }, [filters.have_wifi, filters.have_express]);

    const totalSeatsCount  = adultsTicketsCount + kidsTicketsCount;
    const remainingSeats = availableSeats - totalSeatsCount;

    useEffect(() => {
        setAdultsCount(adultsTicketsCount);
        setKidsCount(kidsTicketsCount)
    }, [adultsTicketsCount, kidsTicketsCount]);

    const onCoachSelection = (coach: ICoachInfo) => {
        setAvalableSeats(coach.seats.length);
    };

    useEffect(() => { 
        if (directionType === 'departure') { 
          setIsDeparture(true); 
        } else { 
          setIsArrival(true); 
        } 
      }, [directionType])

    return (
        <div className="select-seats-container">
            <div className="another-train-container">
                <img className="back-icon" src="src/icons/back.svg" alt="back" />
                <Button label="Выбрать другой поезд" className="primary btn-another-train" />
            </div>
            <div className="about-train" >
                <div className="number-express-train">
                    <img className="icon-train" src="src/icons/train-orrange.svg" alt="icon-train" />
                    <span className="number-train">{train.name}</span>
                </div>
                <div className="about-direct">
                <div style={{ display: "flex", flexDirection: "column"}} className="direction-arrival">
                    <span className="time-from">{formatTime(from.datetime)}</span>
                    <span className="city-from">{from.city.name}</span>
                    <span className="station-from">{from.railway_station_name}</span>
                </div>
                <img className="arrow" src="src/icons/arrow.svg" alt="icon-train" />
                <div style={{ display: "flex", flexDirection: "column"}} className="direction-departure">
                    <span className="time-to">{formatTime(to.datetime)}</span>
                    <span className="city-to">{to.city.name}</span>
                    <span className="station-to">{to.railway_station_name}</span>
                </div>
            </div>
            <div className="about-time">
                <img className="" style={{ color: "#FFA80", width: "30px", height: "30px"}} src="src/icons/time.svg" alt="icon-train" />
                    <div style={{ display: "flex", flexDirection: "column"}} className="container">
                        <span className="hour">{hours} часов </span>
                        <span className="minutes">{minutes} минут</span>
                    </div>
            </div>
            </div>
            <div className="count-tickets-container">
                <span className="header-count-tickets">Количество билетов</span>
                <div className="inputs-count-container">
                    <div className="adults-count">
                        <div className="input-count-container">
                            <span className="header-in-input">Взрослых -</span>
                            <InputText  
                                className="input-count-seats" 
                                aria-label='fff'
                                onChange={(e) => setAdultsTicketsCount(parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <span className="clue-adults">Можно добавить еще {remainingSeats} пассажиров</span>
                    </div>
                    <div className="kids-count">
                        <div className="input-count-container">
                            <span className="header-in-input">Детских -</span>
                            <InputText  
                                className="input-count-seats" 
                                aria-label='fff'
                                onChange={(e) => setKidsTicketsCount(parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <span className="clue-kids">Можно добавить еще {remainingSeats} детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле 
                        в среднем на 50-65%</span>
                    </div>
                    <div className="babies-count">
                        <div className="input-count-container">
                            <span className="header-in-input">Детских "без места" -</span>
                            <InputText  className="input-count-seats" aria-label='fff'/>
                        </div>                    
                    </div>
                </div>
            </div>
            {coaches && coaches.length && (
                <TypeOfCoach onCoachSelection={onCoachSelection} coaches={coaches} />
            )}
        </div>
    )
};