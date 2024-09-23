import { createContext, useState, useContext, ReactNode } from 'react';

interface OrderStepContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const OrderStepContext = createContext<OrderStepContextType | undefined>(undefined);

export const useOrderStepContext = () => {
  const context = useContext(OrderStepContext);
  if (!context) {
    throw new Error("useOrderStepContext must be used within an OrderStepProvider");
  }
  return context;
};

export const OrderStepProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <OrderStepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </OrderStepContext.Provider>
  );
};
