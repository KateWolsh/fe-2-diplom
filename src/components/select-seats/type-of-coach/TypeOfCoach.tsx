import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import sedentary from '../../../icons/sedentary.svg'
import reserved from '../../../icons/reserved-seat-big.svg'
import luxe from '../../../icons/luxe-big.svg'
import coupe from '../../../icons/coupe-big.svg'
import './style.css'
import { SelectSeatsInCoach } from '../select-seats-in-coach/SelectSeatsInCoach';
import { CoachClass } from '../../../types';
import { ICoachInfo } from '../../../types';

interface TypeOfCoachProps {
    coaches: ICoachInfo[];
    onCoachSelection: (coach: ICoachInfo) => void;
  }

export const TypeOfCoach = ({ coaches, onCoachSelection }: TypeOfCoachProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const typesOfCoaches = ['fourth', 'third', 'second', 'first'] as CoachClass[]
    return (
        <div className="type-of-coach-container">
            <span className="header-type-of-coach">Тип вагона</span>
            <div className="tabs-container">
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header={<div className="tab-header">
                        <img src={sedentary} alt="User Icon" className="custom-icon sedentary" />
                        <span className="tab-label">Сидячий</span>
                    </div>} />
                    <TabPanel header={<div className="tab-header">
                        <img src={reserved} alt="Settings Icon" className="custom-icon reserved" />
                        <span className="tab-label">Плацкарт</span>
                    </div>} />
                    <TabPanel header={<div className="tab-header">
                        <img src={coupe} alt="Info Icon" className="custom-icon coupe" />
                        <span className="tab-label">Купе</span>
                    </div>} />
                    <TabPanel header={<div className="tab-header">
                        <img src={luxe} alt="Info Icon" className="custom-icon luxe" />
                        <span className="tab-label">Люкс</span>
                    </div>} />
                </TabView>
                <div className="tab-content">
                    {<SelectSeatsInCoach onCoachSelection={onCoachSelection} type={typesOfCoaches[activeIndex]} coaches={coaches} /> }
                </div>
            </div>

        </div>
    );
};

export default TypeOfCoach;

