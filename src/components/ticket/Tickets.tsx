import { Ticket } from '../ticket/Ticket'
import { ITicketsProps } from '../../types';
import { useState } from 'react';
import { Paginator } from 'primereact/paginator';

export const Tickets = ({ items, onSelectSeatsClick }: ITicketsProps) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);  

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="tickets-container">
            {items.slice(first, first + rows).map((item, index) => (
                <Ticket key={index} item={item} onSelectSeatsClick={() => onSelectSeatsClick(item)} />
            ))}

            <Paginator 
                first={first} 
                rows={rows} 
                totalRecords={items.length} 
                onPageChange={onPageChange} 
                rowsPerPageOptions={[5, 10, 20, 50]}
            />
        </div>
    )
};

