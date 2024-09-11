import 'primeicons/primeicons.css';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { useCallback, useState } from 'react';
import FiltersPanel from '../filter-pannel/FilterPanel'
import { RangeSlider } from '../../components/slider/Slider'
import { Button } from 'primereact/button';
import './style.css'
import { useSearchContext } from '../../hooks/useSearchContext ';

const initialPrice: [number, number] = [1900, 10000];

function SearchTicketsWithFilters() {
  const { fromDate, toDate, setFromDate, setToDate } = useSearchContext();

  const { setPriceFrom, setPriceTo, setDeparture, setArrival } = useSearchContext();

  const [isExpandedTo, setIsExpandedTo] = useState(false);
  const [isExpandedFrom, setIsExpandedFrom] = useState(false);


  const handlePriceSubmit = useCallback((range: [number, number]) => {
    setPriceFrom(range[0]);
    setPriceTo(range[1]);
}, [])

const handleOutboundDeparture = useCallback((range: [number, number]) => handleTimeSubmit(range, "outbound_departure"), []);
const handleOutboundArrival = useCallback((range: [number, number]) => handleTimeSubmit(range, "outbound_arrival"), []);
const handleInboundDeparture = useCallback((range: [number, number]) => handleTimeSubmit(range, "inbound_departure"), []);
const handleInboundArrival = useCallback((range: [number, number]) => handleTimeSubmit(range, "inbound_arrival"), []);

const handleTimeSubmit = useCallback((range: [number, number], id: string) => {
      if(id === "outbound_departure") {
        setDeparture((prev) => ({
            ...prev,
            startDepartureHourFrom: range[0],
            startDepartureHourTo: range[1],
          }));
      }
      if (id === "outbound_arrival") {
          setDeparture((prev) => ({
              ...prev,
              endDepartureHourFrom: range[0],
              endDepartureHourTo: range[1],
            }));
      }
    if (id === "inbound_departure") {
        setArrival((prev) => ({
            ...prev,
            startArrivalHourFrom: range[0],
            startArrivalHourTo: range[1],
          }));
    }
    if (id === "inbound_arrival") {
        setArrival((prev) => ({
            ...prev,
            endArrivalHourFrom: range[0],
            endArrivalHourTo: range[1],
        }));
    }
}, []);
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
        initialRange={initialPrice}
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
            initialRange={[100, 1440]}
            onSubmit={handleOutboundDeparture}
            type="time"
            id="outbound_departure"
          />
          <RangeSlider
            header="Время прибытия"
            minValue={0}
            maxValue={1440}
            initialRange={[100, 1440]}
            onSubmit={handleOutboundArrival}
            type="time"
            id="outbound_arrival"
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
            initialRange={[100, 1440]}
            onSubmit={handleInboundDeparture}
            type="time"
            id="inbound_departure"

          />
          <RangeSlider
            header="Время прибытия"
            minValue={0}
            maxValue={1440}
            initialRange={[100, 1440]}
            onSubmit={handleInboundArrival}
            type="time"
            id="inbound_arrival"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchTicketsWithFilters
