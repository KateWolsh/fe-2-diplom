import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { DataView } from 'primereact/dataview';
import './style.css';

interface City {
    railway_station_name: string;
    city: {
        name: string;
    };
}

interface Departure {
    _id: string;
    train: {
        _id: string;
        name: string;
    };
    from: City;
    to: City;
    min_price: number;
}

export const LastTickets = () => {
    const [tickets, setTickets] = useState<Departure[]>([]);
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    useEffect(() => {
        fetch('https://students.netoservices.ru/fe-diplom/routes/last')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Проверка структуры данных
                const processedData = data.map((item: any) => item.departure);
                setTickets(processedData);
            });
    }, []);

    const renderTicket = (ticket: Departure) => {
        const { from, to, min_price } = ticket;
        return (
            <div className=" cards-last-tikets-container">
                <Card className="ticket-card">
                    <div className="last-ticket-grid">
                        <div className="last-ticket-from-container">
                            <span style={{ color: '#292929', fontSize: '20px' }} className="last-ticket-city">{capitalizeFirstLetter(from.city.name)}</span>
                            <span style={{ color: '#928F94', fontSize: '16px' }} className="last-ticket-station">{from.railway_station_name}</span>
                        </div>
                        <div className="last-ticket-to-container">
                            <span style={{ color: '#292929', fontSize: '20px' }} className="last-ticket-city">{capitalizeFirstLetter(to.city.name)}</span>
                            <span style={{ color: '#928F94', fontSize: '16px' }} className="last-ticket-station">{to.railway_station_name}</span>
                        </div>
                        <div className="last-ticket-filters">
                            <img src="src/icons/filters.svg" alt="Filters" />
                        </div>
                        <div className="last-ticket-price">
                            <span style={{ color: '#928F94' }}>От </span>
                            <span style={{ color: '#FFA800', fontSize: '36px' }}>{min_price} </span>
                            <span style={{ color: '#928F94', fontSize: '36px' }}>₽</span>
                        </div>
                    </div>
                </Card>
            </div>
        );
    };
    return (
        <div className="tikets-container">
            <span className="header-last-tickets">ПОСЛЕДНИЕ БИЛЕТЫ</span>
            <div className="p-grid">
                <DataView value={tickets} itemTemplate={renderTicket} layout="grid" />
            </div>
        </div>
        
    );
};

export default LastTickets;
