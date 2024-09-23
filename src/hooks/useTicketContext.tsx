import React, { createContext, useContext, useState } from 'react';
import { IItem } from '../types';

interface TicketContextProps {
  selectedTicket: IItem | null;
  setSelectedTicket: React.Dispatch<React.SetStateAction<IItem | null>>;
  typeOfCoachThirdDeparture: boolean;
  setTypeOfCoachThirdDeparture: React.Dispatch<React.SetStateAction<boolean>>;
  typeOfCoachThirdArrival: boolean;
  setTypeOfCoachThirdArrival: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTicket, setSelectedTicket] = useState<IItem | null>(null);
  const [typeOfCoachThirdDeparture, setTypeOfCoachThirdDeparture] = useState<boolean>(false)
  const [typeOfCoachThirdArrival, setTypeOfCoachThirdArrival] = useState<boolean>(false)

  return (
    <TicketContext.Provider value={{ selectedTicket, setSelectedTicket, typeOfCoachThirdDeparture, setTypeOfCoachThirdDeparture, typeOfCoachThirdArrival, setTypeOfCoachThirdArrival }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};
