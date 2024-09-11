import { Ticket } from '../ticket/Ticket'
import { ITicketsProps } from '../../types';

export const Tickets = ({ items, onSelectSeatsClick }: ITicketsProps) => {
    return (
        <div className="tickets-container">
            {items.map((item, index) => (
                <Ticket key={index} item={item} onSelectSeatsClick={() => onSelectSeatsClick(item)}/>
            ))}
        </div>
    )
};

