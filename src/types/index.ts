import { City } from '../utils/getCity';

export interface SearchContextType {
    fromCity: City | null;
    setFromCity: React.Dispatch<React.SetStateAction<City | null>>;
    toCity: City | null;
    setToCity: React.Dispatch<React.SetStateAction<City | null>>;
    fromDate: Date | null;
    setFromDate: React.Dispatch<React.SetStateAction<Date | null>>;
    toDate: Date | null;
    setToDate: React.Dispatch<React.SetStateAction<Date | null>>;
    filters: {
      have_second_class: boolean;
      have_third_class: boolean;
      have_fourth_class: boolean;
      have_first_class: boolean;
      have_wifi: boolean;
      have_express: boolean;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
      have_second_class: boolean;
      have_third_class: boolean;
      have_fourth_class: boolean;
      have_first_class: boolean;
      have_wifi: boolean;
      have_express: boolean;
    }>>;
  
    priceFrom: number;
    setPriceFrom: React.Dispatch<React.SetStateAction<number>>;
    priceTo: number;
    setPriceTo: React.Dispatch<React.SetStateAction<number>>;
    startDepartureHourFrom: number;
    setStartDepartureHourFrom: React.Dispatch<React.SetStateAction<number>>;
    startDepartureHourTo: number;
    setStartDepartureHourTo: React.Dispatch<React.SetStateAction<number>>;
    startArrivalHourFrom: number;
    setStartArrivalHourFrom: React.Dispatch<React.SetStateAction<number>>;
    startArrivalHourTo: number;
    setStartArrivalHourTo: React.Dispatch<React.SetStateAction<number>>;
    endDepartureHourFrom: number;
    setEndDepartureHourFrom: React.Dispatch<React.SetStateAction<number>>;
    endDepartureHourTo: number;
    setEndDepartureHourTo: React.Dispatch<React.SetStateAction<number>>;
    endArrivalHourFrom: number;
    setEndArrivalHourFrom: React.Dispatch<React.SetStateAction<number>>;
    endArrivalHourTo: number;
    setEndArrivalHourTo: React.Dispatch<React.SetStateAction<number>>;
  }
  