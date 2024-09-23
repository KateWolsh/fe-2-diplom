import React, { useState } from 'react';
import { useOrderContext } from '../../hooks/useOrderContext'; 
import InfoAboutPassenger from '../info-about-passenger/InfoAboutPassenger';
import { Button } from 'primereact/button';
import './style.css'
import { PaymentForm } from '../payment-form/PaymentForm';

export const PassengerCards: React.FC = () => {
    const { adultsCount, kidsCount } = useOrderContext();

    const totalSeats = adultsCount + kidsCount
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const [validPassengers, setValidPassengers] = useState<boolean[]>(new Array(totalSeats).fill(false));

    const handleValidationChange = (index: number, isValid: boolean) => {
        const updatedValidPassengers = [...validPassengers];
        updatedValidPassengers[index] = isValid;
        setValidPassengers(updatedValidPassengers);
    };

    const allValid = validPassengers.every(isValid => isValid);

    const handleNextClick = () => {
        if (allValid) {
            setShowPaymentForm(true);
        }
    };
    
    return (
        <div className="passenger-cards-container">
            {showPaymentForm ? (
                <PaymentForm />
            ) : (
                <>
                    {Array.from({ length: totalSeats }, (_, index) => (
                        <InfoAboutPassenger key={index} passengerIndex={index} onValidationChange={handleValidationChange} />
                    ))}
                    <Button 
                        label="Далее" 
                        className="btn-main" 
                        disabled={!allValid} 
                        onClick={handleNextClick} 
                    />
                </>
            )}
        </div>
    );
};

