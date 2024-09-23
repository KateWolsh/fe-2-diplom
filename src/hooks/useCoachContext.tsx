import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CoachContextType {
    selectedCoachId: string | null;
    setSelectedCoachId: (id: string | null) => void;
    departureCoachId: string | null;
    setDepartureCoachId: (id: string | null) => void;
    arrivalCoachId: string | null;
    setArrivalCoachId: (id: string | null) => void;
}

const CoachContext = createContext<CoachContextType | undefined>(undefined);

export const CoachProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedCoachId, setSelectedCoachId] = useState<string | null>(null);
    const [departureCoachId, setDepartureCoachId] = useState<string | null>(null);
    const [arrivalCoachId, setArrivalCoachId] = useState<string | null>(null);

    const value = {
        selectedCoachId,
        setSelectedCoachId,
        departureCoachId,
        setDepartureCoachId,
        arrivalCoachId,
        setArrivalCoachId,
    };

    return (
        <CoachContext.Provider value={value}>
            {children}
        </CoachContext.Provider>
    );
};

export const useCoachContext = (): CoachContextType => {
    const context = useContext(CoachContext);
    if (!context) {
        throw new Error('useCoachContext must be used within a CoachProvider');
    }
    return context;
};
