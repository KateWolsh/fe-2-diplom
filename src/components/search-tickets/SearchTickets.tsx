import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import './style.css'
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { useState } from 'react';
import { getCity, City } from '../../api/getCity';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../hooks/useSearchContext ';

function SearchTickets() {
  const navigate = useNavigate();

  const { fromCity, setFromCity, toCity, setToCity, fromDate, setFromDate, toDate, setToDate } = useSearchContext();
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);

  const searchFromCity = async (event: AutoCompleteCompleteEvent) => {
    const query = event.query;
    if (query.length > 2) {
      const cities = await getCity(query);
      console.log(cities)
      setFromSuggestions(cities);
    } else {
      setFromSuggestions([]);
    }
  }
  const searchToCity = async (event: AutoCompleteCompleteEvent) => {
    try {
      const query = event.query;
      if (query.length > 2) {
        const cities = await getCity(query);
        console.log('cities', cities)
        setToSuggestions(cities);
      } else {
        setToSuggestions([]);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const handleSubmit = async () => {
    if (fromCity && toCity && fromDate && toDate) {
      const requestData = {
        from_city_id: fromCity._id,
        to_city_id: toCity._id,
        date_start: fromDate.toISOString().split('T')[0],
        date_end: toDate.toISOString().split('T')[0],
      };

      localStorage.setItem('searchData', JSON.stringify(requestData));

      try {
        const query = new URLSearchParams(requestData);

        navigate(`/order?${query.toString()}`);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    } else {
      alert('Please fill all the fields');
    }
  }
  return (
    <div className="search-form">
      <div className="inputs-wrapper">
        <div className="direct-form-container">
          <span className="header-direct">Направление</span>
          <div className="inputs-direction">
            <FloatLabel>
              <AutoComplete
                className="input-direction"
                value={fromCity}
                field="name"
                suggestions={fromSuggestions}
                completeMethod={searchFromCity}
                onChange={(e) => setFromCity(e.value)}
              />
              <label htmlFor="from">Откуда</label>
              <i className="pi pi-map-marker icon-search-form" />
            </FloatLabel>
            <i className="pi pi-refresh" style={{ fontSize: '1em', color: 'grey' }}></i>
            <FloatLabel>
              <AutoComplete
                className="input-direction"
                value={toCity}
                field="name"
                suggestions={toSuggestions}
                completeMethod={searchToCity}
                onChange={(e) => setToCity(e.value)}
              />
              <label htmlFor="to">Куда</label>
              <i className="pi pi-map-marker icon-search-form" />
            </FloatLabel>
          </div>
        </div>
        <div className="date-form-container">
          <span className="header-date">Дата</span>
          <div className="inputs-date">
            <FloatLabel>
              <Calendar
                className="input-date"
                id="from-date"
                value={fromDate} onChange={(e) => setFromDate(e.value as Date | null)}
              />
              <label htmlFor="to">ДД/ММ/ГГ</label>
              <i className="pi pi-calendar-minus icon-search-form" />
            </FloatLabel>
            <FloatLabel>
              <Calendar
                className="input-date"
                id="to-date"
                value={toDate} onChange={(e) => setToDate(e.value as Date | null)}
              />
              <label htmlFor="to">ДД/ММ/ГГ</label>
              <i className="pi pi-calendar-minus icon-search-form" />
            </FloatLabel>
          </div>
        </div>
      </div>
      <Button
        className="btn-main"
        label="НАЙТИ БИЛЕТЫ"
        onClick={handleSubmit}
        disabled={!fromCity || !toCity || !fromDate || !toDate}
      />
    </div>

  )
}

export default SearchTickets
