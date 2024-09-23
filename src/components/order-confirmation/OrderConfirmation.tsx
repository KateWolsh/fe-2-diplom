import { Button } from 'primereact/button'
import './style.css'
import { useOrderContext } from '../../hooks/useOrderContext'
import { useNavigate } from 'react-router-dom';

export const OrderConfirmation = () => {
    const navigate = useNavigate();

    const handleConfirmClick = () => {
        navigate('/');
    };

    const { user } = useOrderContext()
    return (
        <div className="order-confirmation-container">
            <div className="order-confirmation-header-container">
                <div className="number-of-order">№Заказа 285АА</div>
                <div className="common-price">
                    <span className="common">сумма </span>
                    <span className="price"> 7 760 ₽</span>
                </div>
            </div>
            <div className="instruction-container">
                <div className="instruction-item">
                    <img className="train-icon" src="src/icons/computer.svg" alt="icon-train" />
                    <span>билеты будут отправлены на ваш e-mail</span>
                </div>
                <div className="instruction-item">
                    <img className="train-icon" src="src/icons/tickets.svg" alt="icon-train" />
                    <span>распечатайте и сохраняйте билеты до даты поездки</span>
                </div>
                <div className="instruction-item">
                    <img className="train-icon" src="src/icons/manager.svg" alt="icon-train" />
                    <span>предьявите распечатанные билеты при посадке</span>
                </div>
            </div>
            <div className="information-container">
                <span className="name-user">{user.first_name}{user.last_name}</span>
                <p>Ваш заказ успешно оформлен. В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                <p>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
            </div>
            <div className="rate-order-container">
                <div className="rate-order">
                    <span>Оценить сервис</span>
                    <img className="train-icon" src="src/icons/stars.svg" alt="icon-train" />
                </div>
                <Button 
                    className='primary next-passenger' 
                    label='ВЕРНУТЬСЯ НА ГЛАВНУЮ' 
                    onClick={handleConfirmClick}
                /> 
            </div>
        </div>
    )
}