import React, { createContext, useContext, useState } from 'react';

interface DirectionContextProps {
  isDeparture: boolean;
  setIsDeparture: React.Dispatch<React.SetStateAction<boolean>>;
  isArrival: boolean;
  setIsArrival: React.Dispatch<React.SetStateAction<boolean>>;
}

const DirectionContext = createContext<DirectionContextProps | undefined>(undefined);

export const DirectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDeparture, setIsDeparture] = useState<boolean>(false)
  const [isArrival, setIsArrival] = useState<boolean>(false)

  return (
    <DirectionContext.Provider value={{ isDeparture, setIsDeparture, isArrival, setIsArrival }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirectionContext = () => {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error('useDirectionContext must be used within a DirectionProvider');
  }
  return context;
};
