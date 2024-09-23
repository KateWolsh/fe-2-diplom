import { useState } from "react";
import 'primeicons/primeicons.css';
import { InputMask } from 'primereact/inputmask';
import './style.css'
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useOrderContext } from '../../hooks/useOrderContext'
import { useTicketContext } from "../../hooks/useTicketContext";
import { Button } from "primereact/button";
import { Ticket } from "../ticket/Ticket";
import { PassengersConfirm } from "../passengers-confirm/PassengersConfirm";

export const PaymentForm = () => {
    const { user, setUser } = useOrderContext();
    const { selectedTicket } = useTicketContext();
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [isValid, setIsValid] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>(user.payment_method);
    
    const [showConfirmation, setShowConfirmation] = useState(false);


    const handlePhoneChange = (e: { value: string }) => {
        setPhoneNumber(e.value);
        setUser(prevUser => ({
            ...prevUser,
            phone: e.value
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(value));
        setUser(prevUser => ({
            ...prevUser,
            email: value
        }));
    };

    const handlePaymentMethodChange = (method: 'cash' | 'online') => {
        setPaymentMethod(method);
        setUser(prevUser => ({
            ...prevUser,
            payment_method: method
        }));
    };
    const isFormValid = () => {
        const isPhoneNumberValid = phoneNumber.trim() !== '';
        const isEmailValid = isValid;
        const isPaymentMethodSelected = paymentMethod === 'cash' || paymentMethod === 'online';
        return isPhoneNumberValid && isEmailValid && isPaymentMethodSelected;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            // Логика обработки данных формы
            setShowConfirmation(true); // Показать компоненты Ticket и PassengersConfirm
        }
    };

    console.log('user', user)

    if (showConfirmation) {
        return (
            <div>
                <Ticket item={selectedTicket}/>
                <PassengersConfirm />
            </div>
        );
    }
    
    return (
        <div className="personal-data-container">
            <div className="header-personal-data-container">
                    <h3 className="header-personal-data">Персональные данные</h3>
            </div>
                    <div className="p-field all-name-personal-data-container">
                        <div className="p-field">
                            <label className="last-name" htmlFor="lastName">Фамилия</label>
                            <InputText 
                                className="name" 
                                id="lastName" 
                                placeholder="Фамилия" 
                                value={user.last_name} 
                                onChange={(e) => setUser(prevUser => ({ ...prevUser, last_name: e.target.value }))}
                            />                        
                        </div>
                        <div className="p-field">
                            <label className="first-name" htmlFor="firstName">Имя</label>
                            <InputText 
                                className="name" 
                                id="firstName" 
                                placeholder="Имя" 
                                value={user.first_name} 
                                onChange={(e) => setUser(prevUser => ({
                                    ...prevUser,
                                    first_name: e.target.value
                                }))}
                            />
                        </div>

                        <div className="p-field">
                            <label className="middle-name" htmlFor="middleName">Отчество</label>
                            <InputText 
                                className="name" 
                                id="middleName" 
                                placeholder="Отчество" 
                                value={user.patronymic} 
                                onChange={(e) => setUser(prevUser => ({
                                    ...prevUser,
                                    patronymic: e.target.value
                                }))}
                            />                        </div>
                    </div>
                    <div className="personal-contacts">
                        <div className="p-field number-container">
                            <label htmlFor="phoneNumber">Номер телефона</label>
                                <InputMask
                                    id="phoneNumber"
                                    mask="+7 (999) 999-99-99"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    placeholder="+7 ___ ___ __ __"
                                    className="phone-number input-with-mask"
                                />
                        </div> 
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="example@example.com"
                                className={`email-input ${isValid ? '' : 'invalid'}`}
                            />
                                {!isValid && (
                                    <small className="p-error">Введите корректный email адрес.</small>
                                )}
                        </div>          
                    </div>
                    <div className="header-payment-method-container">
                        <h3 className="header-payment-method">Способ оплаты</h3>
                    </div>
                    <div className="online-pay-container">
                        <div className="flex align-items-center chekbox-online-container">
                            <Checkbox
                                className="checkbox-online"
                                inputId="online-pay"
                                name="online"
                                value="Онлайн"
                                checked={paymentMethod === 'online'}
                                onChange={() => handlePaymentMethodChange('online')}
                            />                            
                            <label className="online-label">Онлайн</label>
                        </div>
                        <div className="types-cards">
                            <span>Банковской картой</span>
                            <span>PayPal</span>
                            <span>Visa QIWI Wallet</span>
                        </div>
                    </div>
                    <div className="decoratin-line"></div>
                    <div className="flex align-items-center chekbox-cash-container">
                        <Checkbox
                            className="checkbox-cash"
                            inputId="cash-pay"
                            name="cash"
                            value="Наличными"
                            checked={paymentMethod === 'cash'}
                            onChange={() => handlePaymentMethodChange('cash')}
                        />                            
                        <label className="online-label">Наличными</label>
                    </div>
                    <Button 
                        label="Купить билеты" 
                        className="btn-main" 
                        disabled={!isFormValid()}
                        onClick={handleSubmit} 
                    />
        </div>
    )
}