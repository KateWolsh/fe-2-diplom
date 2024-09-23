import { City } from '../api/getCity';

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

    departure?: {
      startDepartureHourFrom: number;
      startDepartureHourTo: number;
      endDepartureHourFrom: number;
      endDepartureHourTo: number;
    };
    setDeparture: React.Dispatch<React.SetStateAction<{
      startDepartureHourFrom: number;
      startDepartureHourTo: number;
      endDepartureHourFrom: number;
      endDepartureHourTo: number;
    }>>;
    
    arrival?: {
      startArrivalHourFrom: number;
      startArrivalHourTo: number;
      endArrivalHourFrom: number;
      endArrivalHourTo: number;
    };
    setArrival: React.Dispatch<React.SetStateAction<{
      startArrivalHourFrom: number;
      startArrivalHourTo: number;
      endArrivalHourFrom: number;
      endArrivalHourTo: number;
    }>>;
  }
  
export enum CoachClass {
    LUX = 'first',
    COUPE = 'second',
    RESERVED = 'third',
    SEATED = 'fourth'
  }
  
export interface Seat {
    index: number;
    available: boolean;
  }

  
export interface IItem {
  departure: {
      _id: string;
      train: { _id: string, name: string };
      from: { datetime: number, city: { name: string }, railway_station_name: string };
      to: { datetime: number, city: { name: string }, railway_station_name: string };
      available_seats_info: IAvailableSeatsInfo;
      price_info: IClassPriceInfo;
  };
  arrival: {
      _id: string;
      train: { _id: string, name: string };
      from: { datetime: number, city: { name: string }, railway_station_name: string };
      to: { datetime: number, city: { name: string }, railway_station_name: string };
      available_seats_info: IAvailableSeatsInfo;
      price_info: IClassPriceInfo;
  };
}

export interface ITicketsProps {
  items: IItem[];
  onSelectSeatsClick: (ticket: IItem) => void;
}

export interface ITicketProps {
  item: IItem;
}

export interface IClassPriceInfo {
  first?: { price: number, bottom_price: number };
  second?: { price: number, bottom_price: number };
  third?: { price: number, bottom_price: number };
  fourth?: { price: number, bottom_price: number };
}

export interface IAvailableSeatsInfo {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface ICoach {
  _id: string;
  name: string;
  class_type: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  available_seats: number;
  is_linens_included: boolean;
}

export interface ICoachInfo {
  coach: ICoach;
  seats: Array<{
    index: number;
    available: boolean;
  }>;
}

export interface ISelectedSeatsProps {
  direction: IDirection;
  directionType: string;
}

export interface IDirection {
  _id: string;
  train: { _id: string, name: string };
  from: { datetime: number, city: { name: string }, railway_station_name: string };
  to: { datetime: number, city: { name: string }, railway_station_name: string };
  available_seats_info: IAvailableSeatsInfo;
  price_info: IClassPriceInfo;
}