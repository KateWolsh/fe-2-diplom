import './style.css'
import { useOrderContext } from '../../hooks/useOrderContext'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTicketContext } from '../../hooks/useTicketContext';
import { useCoachContext } from '../../hooks/useCoachContext';
import {submitOrder} from '../../api/submitOrder'

export const PassengersConfirm = () => {
    const { passengerInfo, totalPrice, user, selectedDepartureSeats } = useOrderContext();
    const { selectedTicket } = useTicketContext();
    const { departureCoachId, arrivalCoachId } = useCoachContext()

    const navigate = useNavigate();
    const orderData = {
        user: {
            first_name: user.first_name,
            last_name: user.last_name,
            patronymic: user.patronymic,
            phone: user.phone,
            email: user.email,
            payment_method: user.payment_method,
        },
        departure: {
            route_direction_id: selectedTicket?.departure._id, 
            seats: Object.keys(passengerInfo).map((id, index) => {
                const passenger = passengerInfo[id];
                return {
                    coach_id: departureCoachId,
                    person_info: {
                        is_adult: passenger.is_adult,
                        first_name: passenger.first_name,
                        last_name: passenger.last_name,
                        patronymic: passenger.patronymic,
                        gender: passenger.gender,
                        birthday: passenger.birthday,
                        document_type: passenger.document_type,
                        document_data: passenger.document_data,
                    },
                    seat_number: selectedDepartureSeats[index],
                    is_child: passenger.is_adult ? false : true, 
                    include_children_seat: false, 
                };
            }),
        },
        arrival: {
            route_direction_id: selectedTicket?.arrival._id, 
            seats: Object.keys(passengerInfo).map((id, index) => {
                const passenger = passengerInfo[id];
                return {
                    coach_id: arrivalCoachId,
                    person_info: {
                        is_adult: passenger.is_adult,
                        first_name: passenger.first_name,
                        last_name: passenger.last_name,
                        patronymic: passenger.patronymic,
                        gender: passenger.gender,
                        birthday: passenger.birthday,
                        document_type: passenger.document_type,
                        document_data: passenger.document_data,
                    },
                    seat_number: selectedDepartureSeats[index],
                    is_child: passenger.is_adult ? false : true, 
                    include_children_seat: false, 
                };
            }),
        },
    };

    const handleConfirmClick = async () => {
        try {
            await submitOrder(orderData);
            navigate('/empty-page'); // Переход на страницу после успешной отправки
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
        }
    };

    const paymentMethodText = user.payment_method === 'cash' ? 'Наличными' : 'Онлайн';
    return (
        <div className="passengers-confirm-container">
            <div className="passengers-confirm-header">
                <span>Пассажиры</span>
            </div>
            <div className="passengers-confirm-decore-line"></div>
            <div className="container">
                <div className="passengers-items-container">
                    {Object.keys(passengerInfo).map((id) => {
                        const passenger = passengerInfo[id];
                        return (
                            <>
                            <div key={id} className="passenger-item">
                                <div className="photo-container">
                                    <img className="avatar" src="src/icons/avatar.svg" alt="avatar" />
                                    <span className="age-name">{passenger.is_adult ? 'Взрослый' : 'Ребёнок'}</span>
                                </div>
                                <div className="information-conainer">
                                    <span className="all-name">{`${passenger.first_name} ${passenger.last_name} ${passenger.patronymic}`}</span>
                                    <span className="gender-name">Пол {passenger.gender ? 'мужской' : 'женский'}</span>
                                    <span className="birthday-name">Дата рождения {passenger.birthday}</span>
                                    <span className="document-name">{passenger.document_type} {passenger.document_data}</span>
                                </div>
                            </div>
                            <div className="decore"></div>
                            </>
                        );
                    })}
                </div>
                <div className="total-price">
                    <span>{totalPrice} ₽</span>
                    <div className="header">Всего</div>
                </div>
                <div className="total-price">
                    <Button className='primary next-passenger' label='Изменить' />    
                </div>
            </div>
            <div className="type-of-payment-container">
                <div className="type-of-payment-header">Способ оплаты</div>
                <div className="decore"></div>
                <div className="type">
                    <span>{paymentMethodText}</span>
                    <Button className='primary next-passenger' label='Изменить' />  
                </div>
            </div>  
            <Button 
                label="Подтвердить" 
                className="btn-main"
                onClick={handleConfirmClick} 
            />
        </div>
    );
};
