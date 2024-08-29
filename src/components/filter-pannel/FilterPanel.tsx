// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import './style.css'
// import Switch from "react-switch";
// import { useState } from 'react';

// interface FilterProps {
//     icon: string;
//     title: string;
// }

// const Filter = ({ icon, title }: FilterProps) => {
//     const [checked, setChecked] = useState(false);

//     return (
//         <div className="filter-container">
//             <div className="filter-icon-container">
//                 <img src={icon} alt="filter icon" className="filter-icon" />
//             </div>
//             <div className="filter-header-container">
//                 <h4 className="filter-header">{title}</h4>
//             </div>
//             <div className="filter-switch-container">
//                 <Switch
//                     className="filter-switch"
//                     activeBoxShadow='0 0 0 0 #3bf'
//                     width={72}
//                     height={19}
//                     handleDiameter={28}
//                     onColor='#FCDC9D'
//                     offColor='#FFFFFF'
//                     offHandleColor='#C4C4C4'
//                     onHandleColor='#FFA800'
//                     checkedIcon={false}
//                     uncheckedIcon={false}
//                     checked={checked}
//                     onChange={() => setChecked(!checked)}
//                 />
//             </div>
//         </div>
//     );
// };

// const FiltersPanel = () => {
//     return (
//         <div className="filters-panel">
//             <Filter icon="src/icons/coupe.svg" title="Купе" />
//             <Filter icon="src/icons/reserved-seat.svg" title="Плацкарт" />
//             <Filter icon="src/icons/sedentary.svg" title="Сидячий" />
//             <Filter icon="src/icons/luxe.svg" title="Люкс" />
//             <Filter icon="src/icons/wi-fi.svg" title="Wi-Fi" />
//             <Filter icon="src/icons/express.svg" title="Экспресс" />
//         </div>
//     );
// };

// export default FiltersPanel;

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './style.css'
import Switch from "react-switch";
import { useSearchContext } from '../../hooks/useSearchContext ';

interface FilterProps {
    icon: string;
    title: string;
    isChecked: boolean;
    onChange: (value: boolean) => void;
}

const Filter = ({ icon, title, isChecked, onChange }: FilterProps) => {
    return (
        <div className="filter-container">
            <div className="filter-icon-container">
                <img src={icon} alt="filter icon" className="filter-icon" />
            </div>
            <div className="filter-header-container">
                <h4 className="filter-header">{title}</h4>
            </div>
            <div className="filter-switch-container">
                <Switch
                    className="filter-switch"
                    activeBoxShadow='0 0 0 0 #3bf'
                    width={72}
                    height={19}
                    handleDiameter={28}
                    onColor='#FCDC9D'
                    offColor='#FFFFFF'
                    offHandleColor='#C4C4C4'
                    onHandleColor='#FFA800'
                    checkedIcon={false}
                    uncheckedIcon={false}
                    checked={isChecked}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};


export const FiltersPanel = () => {
    const { filters, setFilters } = useSearchContext();

    const handleFilterChange = (filter: string, value: boolean) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: value,
        }));
    };
    return (
        <div className="filters-panel">
            <Filter
                icon="src/icons/coupe.svg"
                title="Купе"
                isChecked={filters.have_second_class}
                onChange={(value) => handleFilterChange('have_second_class', value)}
            />
            <Filter
                icon="src/icons/reserved-seat.svg"
                title="Плацкарт"
                isChecked={filters.have_third_class}
                onChange={(value) => handleFilterChange('have_third_class', value)}
            />
            <Filter
                icon="src/icons/sedentary.svg"
                title="Сидячий"
                isChecked={filters.have_fourth_class}
                onChange={(value) => handleFilterChange('have_fourth_class', value)}
            />
            <Filter
                icon="src/icons/luxe.svg"
                title="Люкс"
                isChecked={filters.have_first_class}
                onChange={(value) => handleFilterChange('have_first_class', value)}
            />
            <Filter
                icon="src/icons/wi-fi.svg"
                title="Wi-Fi"
                isChecked={filters.have_wifi}
                onChange={(value) => handleFilterChange('have_wifi', value)}
            />
            <Filter
                icon="src/icons/express.svg"
                title="Экспресс"
                isChecked={filters.have_express}
                onChange={(value) => handleFilterChange('have_express', value)}
            />
        </div>
    );
};

export default FiltersPanel;
