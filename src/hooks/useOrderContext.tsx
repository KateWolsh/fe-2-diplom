import React, { createContext, useContext, useState, ReactNode } from "react";

interface PersonInfo {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: string;
  document_data: string;
}

interface SeatInfo {
  coach_id: string;
  person_info: PersonInfo;
  seat_number: number;
  is_child: boolean;
  include_children_seat: boolean;
}

interface OrderContextType {
  adultsCount: number;
  kidsCount: number;
  user: {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: 'cash' | 'online';
  };
  departureSeats: SeatInfo[];
  arrivalSeats: SeatInfo[];
  selectedDepartureSeats: number[];  
  selectedArrivalSeats: number[]; 
  passengerInfo: { [id: string]: PersonInfo };
  totalPrice: number;
  setSelectedDepartureSeats: (seats: number[]) => void;  
  setSelectedArrivalSeats: (seats: number[]) => void;
  setAdultsCount: (count: number) => void;
  setKidsCount: (count: number) => void;
  setUser: (user: { first_name: string; last_name: string; patronymic: string; phone: string; email: string; payment_method: 'cash' | 'online' }) => void;
  setDepartureSeats: (seats: SeatInfo[]) => void;
  setArrivalSeats: (seats: SeatInfo[]) => void;
  setPassengerInfo: (id: string, info: PersonInfo) => void;
  setTotalPrice: (price: number) => void;
}


const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adultsCount, setAdultsCount] = useState<number>(0);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: 'cash' | 'online';
  }>({
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: 'cash',
  });
  const [departureSeats, setDepartureSeats] = useState<SeatInfo[]>([]);
  const [arrivalSeats, setArrivalSeats] = useState<SeatInfo[]>([]);
  const [selectedDepartureSeats, setSelectedDepartureSeats] = useState<number[]>([]);
  const [selectedArrivalSeats, setSelectedArrivalSeats] = useState<number[]>([]);  
  const [passengerInfo, setPassengerInfo] = useState<{ [id: string]: PersonInfo }>({}); 
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const updatePassengerInfo = (id: string, info: PersonInfo) => {
    setPassengerInfo(prevInfo => ({ ...prevInfo, [id]: info }));
  };

  const value = {
    adultsCount,
    kidsCount,
    user,
    departureSeats,
    arrivalSeats,
    setAdultsCount,
    setKidsCount,
    setUser,
    setDepartureSeats,
    setArrivalSeats,
    selectedDepartureSeats, 
    selectedArrivalSeats,
    setSelectedDepartureSeats,
    setSelectedArrivalSeats,
    passengerInfo,
    setPassengerInfo: updatePassengerInfo,
    totalPrice, 
    setTotalPrice
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
