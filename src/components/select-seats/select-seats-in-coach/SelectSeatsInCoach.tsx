import { CoachClass } from '../../../types'
import { CoachScheme } from '../coach-sheme/CoachScheme'
import './style.css'
import { ICoachInfo } from '../../../types';
import { useEffect, useState } from 'react';

interface SelectSeatsInCoachProps {
    type: CoachClass;
    coaches: ICoachInfo[];
    onCoachSelection: (coach: ICoachInfo) => void;
  }

export const SelectSeatsInCoach = ({ type, coaches, onCoachSelection }: SelectSeatsInCoachProps) => {

    const filterCoaches = coaches.filter((coach) => coach.coach.class_type === type)
    const [selectedCoach, setSelectedCoach] = useState<ICoachInfo | null>(null)

    useEffect(() => {
        console.log('Filter coaches on type change:', filterCoaches);
        setSelectedCoach(filterCoaches ? filterCoaches[0] : null)
        console.log('Смена типа')
    },[type])

    const onClick = (coach: ICoachInfo) => {
        console.log('Coach clicked:', coach);
        setSelectedCoach(coach);
        onCoachSelection(coach)
    }

    return selectedCoach && (
        <div className="select-seats-in-coach-container">
            <div className="coaches-info">
                <span className="avalable-couches">Вагоны </span>
                {filterCoaches.map((coach) => (
                    <span 
                        className={selectedCoach.coach._id === coach.coach._id ? "selected-coach-name" : "coach-name"} 
                        key={coach.coach._id}
                        onClick={() => onClick(coach)}
                    >
                        {coach.coach.name}
                    </span>
                ))}
                <span className="info-avalable-couches">Нумерация вагонов начинается с головы поезда</span>
            </div>
            <div className="container-detailed-information">
                <div className="detailed-information">
                    <div className="number-coach-container">
                        <span className="number-coach">{selectedCoach.coach.name}</span>
                        <span>вагон</span>
                    </div>
                        <div className="grid-table detailed-about-seats">
                            <div className="grid-header common-seats">
                                <span className="grid-header">Места</span>
                                <span className="count">{selectedCoach.seats.length}</span>
                            </div>
                            <div className="grid-header">Стоимость</div>
                           {selectedCoach.coach.class_type === "third" ? (
                             <>
                                <div className="grid-item top-seats">
                                    <span>Верхние</span>
                                    <span className="top-seats-count"></span>
                                </div>
                                <div className="grid-item price">{selectedCoach.coach.side_price} ₽</div>
                                <div className="grid-item">
                                    <span>Нижние</span>
                                    <span className="bottom-seats-count"></span>
                                </div>
                                 <div className="grid-item price">{selectedCoach.coach.top_price} ₽</div>
                             </>

                           ) : (
                            <div className="price-ticket">{selectedCoach.coach.bottom_price} ₽</div>
                           )} 

                        </div>
                        <div className="info-about-service-container">
                            <span className="header-about-service">Обслуживание  ФПК</span>
                            <div className="service-icon-container">
                                <img className="filter-coach-icon" src="src/icons/conditioner-coach.svg" alt="icon-train" />
                                <img className="filter-coach-icon" src="src/icons/wi-fi-coach.svg" alt="icon-train" />
                                <img className="filter-coach-icon" src="src/icons/bed-sheets-coach.svg" alt="icon-train" />
                            </div>
                        </div>
                </div>
                <div className="choose-seats-container">
                        <CoachScheme type={type} seats={selectedCoach.seats} selectionSeatNumber={selectedCoach.seats.length}/>
                    </div>
            </div>

        </div>
    )
}