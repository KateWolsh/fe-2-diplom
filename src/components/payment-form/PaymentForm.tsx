import { useState } from "react";
import 'primeicons/primeicons.css';
import { InputMask } from 'primereact/inputmask';
import './style.css'
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

export const PaymentForm = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedGenderType, setSelectedgenderType] = useState('adult');
    const [selectedDocumentTypes, setSelectedDocumentTypes] = useState('passport')
    const [selectedGender, setSelectedGender] = useState(null);
    const [isCheckedMobility, setIsCheckedMobility] = useState(false);
    const [documentNumber, setDocumentNumber] = useState('');
    const [documentSeries, setDocumentSeries] = useState('');

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    
    const handleChange = (e) => {
        setPhoneNumber(e.value);
    }
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Проверка на валидность email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(value));
    }
    return (
        <div className="personal-data-container">
            <div className="header-personal-data-container">
                    <h3 className="header-personal-data">Персональные данные</h3>
            </div>
                    <div className="p-field all-name-personal-data-container">
                        <div className="p-field">
                            <label className="last-name" htmlFor="lastName">Фамилия</label>
                            <InputText className="name" id="lastName" placeholder="Фамилия" />
                        </div>

                        <div className="p-field">
                            <label className="first-name" htmlFor="firstName">Имя</label>
                            <InputText className="name" id="firstName" placeholder="Имя" />
                        </div>

                        <div className="p-field">
                            <label className="middle-name" htmlFor="middleName">Отчество</label>
                            <InputText className="name" id="middleName" placeholder="Отчество" />
                        </div>
                    </div>
                    <div className="personal-contacts">
                        <div className="p-field number-container">
                            <label htmlFor="phoneNumber">Номер телефона</label>
                                <InputMask
                                    id="phoneNumber"
                                    mask="+7 (999) 999-99-99"
                                    value={phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+7 ___ ___ __ __"
                                    className="phone-number input-with-mask"
                                />
                        </div> 
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={handleChangeEmail}
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
                            <Checkbox className="checkbox-online" inputId="online-pay" name="online" value="Онлайн" />
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
                            <Checkbox className="checkbox-cash" inputId="cash-pay" name="cash" value="Наличными" />
                            <label className="online-label">Наличными</label>
                    </div>
        </div>
    )
}