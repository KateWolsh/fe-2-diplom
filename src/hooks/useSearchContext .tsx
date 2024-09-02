import React, { createContext, useContext, useState, ReactNode } from 'react';
import { City } from '../utils/getCity';
import { SearchContextType } from '../types/index'

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fromCity, setFromCity] = useState<City | null>(null);
  const [toCity, setToCity] = useState<City | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);
  //поделить как фильтры на 1-2 группы
  const [startDepartureHourFrom, setStartDepartureHourFrom] = useState<number>(0);
  const [startDepartureHourTo, setStartDepartureHourTo] = useState<number>(1440);
  const [startArrivalHourFrom, setStartArrivalHourFrom] = useState<number>(0);
  const [startArrivalHourTo, setStartArrivalHourTo] = useState<number>(1440);
  const [endDepartureHourFrom, setEndDepartureHourFrom] = useState<number>(0);
  const [endDepartureHourTo, setEndDepartureHourTo] = useState<number>(1440);
  const [endArrivalHourFrom, setEndArrivalHourFrom] = useState<number>(0);
  const [endArrivalHourTo, setEndArrivalHourTo] = useState<number>(1440);

  const [filters, setFilters] = useState({
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_first_class: false,
    have_wifi: false,
    have_express: false
  });

  return (
    <SearchContext.Provider value={{ 
      fromCity, setFromCity, toCity, setToCity, fromDate, setFromDate, toDate, setToDate, filters, setFilters,
      priceFrom, setPriceFrom, priceTo, setPriceTo, startDepartureHourFrom, setStartDepartureHourFrom, startDepartureHourTo, setStartDepartureHourTo,
      startArrivalHourFrom, setStartArrivalHourFrom, startArrivalHourTo, setStartArrivalHourTo,
      endDepartureHourFrom, setEndDepartureHourFrom, endDepartureHourTo, setEndDepartureHourTo,
      endArrivalHourFrom, setEndArrivalHourFrom, endArrivalHourTo, setEndArrivalHourTo }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
