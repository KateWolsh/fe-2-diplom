import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './style.css'
import { FloatLabel } from 'primereact/floatlabel';
import { useState } from 'react';

function Subscription() {
    const [email, setEmail] = useState<string>('')
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
    const [subscriptionMessage, setSubscriptionMessage] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsValidEmail(validateEmail(value));
    }

    const handleEmailSubmit = async () => {
        if (validateEmail(email)) {
            try {
                const response = await fetch(`https://students.netoservices.ru/fe-diplom/subscribe?email=${email}`)
                console.log(response)
                if (response.ok) {
                    setSubscriptionMessage('Вы успешно подписались на рассылку!');
                } else {
                    setSubscriptionMessage('Произошла ошибка при подписке. Попробуйте еще раз.');
                }
            } catch (error) {
                setSubscriptionMessage('Произошла ошибка при подписке. Попробуйте еще раз.');
            }
        } else {
            setSubscriptionMessage('Введите действительный адрес электронной почты.');
        }

    }
    return (
        <div className="subscription-items">
            <span className="subscription-header">Подписка</span>
            <p className='subscription-text'>Будьте в курсе событий</p>
            <div className="send-email">
                <FloatLabel>
                    <InputText
                        className={`input ${!isValidEmail ? 'p-invalid' : ''}`}
                        id="e-mail"
                        value={email}
                        validateOnly
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="e-mail">E-mail</label>
                </FloatLabel>
                <Button className='primary send-subscription' label='ОТПРАВИТЬ' onClick={handleEmailSubmit} />
            </div>
            {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
        </div>
    )
}

export default Subscription



