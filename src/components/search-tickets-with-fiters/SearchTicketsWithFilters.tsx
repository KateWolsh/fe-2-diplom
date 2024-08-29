import 'primeicons/primeicons.css';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import FiltersPanel from '../filter-pannel/FilterPanel'
import { RangeSlider } from '../../components/slider/Slider'
import { Button } from 'primereact/button';
import './style.css'
import { useSearchContext } from '../../hooks/useSearchContext ';


function SearchTicketsWithFilters() {
  const { fromDate, toDate, setFromDate, setToDate } = useSearchContext();
  // const {
  //   priceFrom, priceTo, startDepartureHourFrom, startDepartureHourTo,
  //   startArrivalHourFrom, startArrivalHourTo, endDepartureHourFrom, endDepartureHourTo,
  //   endArrivalHourFrom, endArrivalHourTo
  // } = useSearchContext();
  const { setPriceFrom, setPriceTo, setStartDepartureHourFrom, setStartDepartureHourTo, setStartArrivalHourFrom, setStartArrivalHourTo, setEndDepartureHourFrom,
    setEndDepartureHourTo, setEndArrivalHourFrom, setEndArrivalHourTo} = useSearchContext();

  const [isExpandedTo, setIsExpandedTo] = useState(false);
  const [isExpandedFrom, setIsExpandedFrom] = useState(false);

  const handlePriceSubmit = (range: [number, number]) => {
    setPriceFrom(range[0]);
    setPriceTo(range[1]);
};

const handleTimeSubmit = (range: [number, number], id: string, header: string) => {
    if (id === "outbound") {
        if (header === "Время отбытия") {
            setStartDepartureHourFrom(range[0]);
            setStartDepartureHourTo(range[1]);
        } else if (header === "Время прибытия") {
            setStartArrivalHourFrom(range[0]);
            setStartArrivalHourTo(range[1]);
        }
    } else if (id === "back") {
        if (header === "Время отбытия") {
            setEndDepartureHourFrom(range[0]);
            setEndDepartureHourTo(range[1]);
        } else if (header === "Время прибытия") {
            setEndArrivalHourFrom(range[0]);
            setEndArrivalHourTo(range[1]);
        }
    }
};
  
  // useEffect(() => {
  //   const buildParams = () => {
  //     return {
  //       fromDate: fromDate,
  //       toDate: toDate,
  //       price_from: priceFrom,
  //       price_to: priceTo,
  //       start_departure_hour_from: startDepartureHourFrom,
  //       start_departure_hour_to: startDepartureHourTo,
  //       start_arrival_hour_from: startArrivalHourFrom,
  //       start_arrival_hour_to: startArrivalHourTo,
  //       end_departure_hour_from: endDepartureHourFrom,
  //       end_departure_hour_to: endDepartureHourTo,
  //       end_arrival_hour_from: endArrivalHourFrom,
  //       end_arrival_hour_to: endArrivalHourTo,
  //       ...filters
  //     };
  //   };
  
  //   const fetchFilteredTickets = async () => {
  //     const params = buildParams();
  //     console.log("Выполнение запроса с параметрами:", params);
  //     const queryString = new URLSearchParams(params as any).toString();
  //     const url = `https://students.netoservices.ru/fe-diplom/routes?${queryString}`;
  
  //     try {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error(`Ошибка ${response.status}`);
  //       }
  //     const data = await response.json();
  //     console.log("Полученные данные:", data);
  //     // Здесь можно обновить состояние с данными
  //     } catch (error) {
  //       console.error("Ошибка при запросе:", error);
  //     }
  //   };
  
  //   fetchFilteredTickets();
  // }, [
  //   priceFrom,
  //   priceTo,
  //   startDepartureHourFrom,
  //   startDepartureHourTo,
  //   startArrivalHourFrom,
  //   startArrivalHourTo,
  //   endDepartureHourFrom,
  //   endDepartureHourTo,
  //   endArrivalHourFrom,
  //   endArrivalHourTo,
  //   filters,
  //   fromDate, 
  //   toDate
  // ]);
  
  const toggleExpansionTo = () => {
    setIsExpandedTo(!isExpandedTo);
  };
  const toggleExpansionFrom = () => {
    setIsExpandedFrom(!isExpandedFrom);
  };


  return (
    <div className="search-form-filters">
      <div className="date-form-container">
        <div className="inputs-date inputs-date-filters">
          <span className='input-header-filters'>Дата поездки</span>
          <FloatLabel>
            <Calendar
              className="input-date input-date-filters"
              id="from-date"
              value={fromDate} onChange={(e) => setFromDate(e.value as Date | null)}
            />
            <label htmlFor="to">ДД/ММ/ГГ</label>
            <i className="pi pi-calendar-minus icon-search-form icon-search-data-filters" />
          </FloatLabel>
          <span className='input-header-filters'>Дата возвращения</span>
          <FloatLabel>
            <Calendar
              className="input-date input-date-filters"
              id="to-date"
              value={toDate} onChange={(e) => setToDate(e.value as Date | null)}
            />
            <label htmlFor="to">ДД/ММ/ГГ</label>
            <i className="pi pi-calendar-minus icon-search-form icon-search-data-filters" />
          </FloatLabel>
        </div>
      </div>

      <div className="filters">
        <FiltersPanel />
      </div>

      <RangeSlider
        header="Стоимость"
        minLabel="От"
        maxLabel="До"
        minValue={1000}
        maxValue={10000}
        initialRange={[1900, 10000]}
        onSubmit={handlePriceSubmit}
        type="price"
      />

      <div className="to-pannel">
        <div className="range-time-section">
          <img src="src/icons/direct-to.svg"></img>
          <span className="main-header-range-time">Туда</span>
          <Button
            icon={isExpandedTo ? "pi pi-minus" : "pi pi-plus"}
            className="p-button-rounded p-button-text btn-range-time"
            onClick={toggleExpansionTo}
          />
        </div>

        <div
          className="expandable-section"
          style={{ display: isExpandedTo ? 'block' : 'none' }}
        >
          <RangeSlider
            header="Время отбытия"
            minValue={0}
            maxValue={1440}
            initialRange={[100, 500]}
            onSubmit={(range) => handleTimeSubmit(range, "outbound", "Время отбытия")}
            type="time"
            id="outbound"
          />
          <RangeSlider
            header="Время прибытия"
            minValue={0}
            maxValue={1440}
            initialRange={[100, 500]}
            onSubmit={(range) => handleTimeSubmit(range, "outbound", "Время прибытия")}
            type="time"
            id="outbound"
          />
        </div>
      </div>
      <div className="from-pannel"
        style={{ backgroundColor: '#3E3C41' }}
      >
        <div className="range-time-section">
          <img src="src/icons/direct-from.svg"></img>
          <span className="main-header-range-time">Обратно</span>
          <Button
            icon={isExpandedFrom ? "pi pi-minus" : "pi pi-plus"}
            className="p-button-rounded p-button-text btn-range-time"
            onClick={toggleExpansionFrom}
          />
        </div>
        <div
          className="expandable-section"
          style={{ display: isExpandedFrom ? 'block' : 'none' }}
        >
          <RangeSlider
            header="Время отбытия"
            minValue={0}
            maxValue={1440}
            initialRange={[600, 900]}
            onSubmit={(range) => handleTimeSubmit(range, "back", "Время отбытия")}
            type="time"
            id="back"

          />
          <RangeSlider
            header="Время прибытия"
            minValue={0}
            maxValue={1440}
            initialRange={[600, 900]}
            onSubmit={(range) => handleTimeSubmit(range, "back", "Время прибытия")}
            type="time"
            id="back"

          />
        </div>
      </div>
    </div>
  )
}

export default SearchTicketsWithFilters
