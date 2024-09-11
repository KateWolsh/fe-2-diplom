import { useMemo, useState } from 'react';
import { CoachClass, Seat } from '../../../types';

import './styles.css';
import { calculatePositions, SEAT_MAP } from './schemeGenerators';

interface CoachShemeProps {
  type: CoachClass;
  seats: Seat[];
  selectionSeatNumber: number;
}

const schemeImages = {
  [CoachClass.LUX]: 'coach-scheme-coupe.svg',
  [CoachClass.RESERVED]: 'coach-scheme.svg',
  [CoachClass.SEATED]: 'coach-scheme-seated.svg',
  [CoachClass.COUPE]: 'coach-scheme-coupe.svg'
};

const getAvailableSeatsScheme = (seatsNumber: number, availableSeats: Seat[]) => {
  const seats = new Array(seatsNumber).fill(false);
  availableSeats.forEach(({ index }) => seats[index] = true);
  return seats;
}

export const CoachScheme = ({ type, seats, selectionSeatNumber }: CoachShemeProps) => {
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const availableSeats = getAvailableSeatsScheme(SEAT_MAP[type], seats.filter((item) => item.available));
  const positions = useMemo(() => {
    return calculatePositions(type);
  }, [type]);

  const handleClick = (number: number, available: boolean) => {
    if (available) {
      const numberIndex = selectedSlots.findIndex((item) => item === number);
      if (numberIndex > -1) {
        const newSelected = [...selectedSlots];
        newSelected.splice(numberIndex, 1);
        setSelectedSlots(newSelected);
      } else if (selectedSlots.length < selectionSeatNumber) {
        setSelectedSlots([...selectedSlots, number]);
      }
    }
  }

  // console.log(positions);

  return (
    <div className="scheme-container">
      <img className="scheme-img" src={`../src/img/${schemeImages[type]}`} />
      {positions.map(({ top, left, number, width, height }) => (
        <div className={
          `${type} seat-slot ${availableSeats[number] ? 'available' : ''} ${selectedSlots.includes(number) ? 'selected' : ''}`
        }
          style={{ top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` }}
          onClick={() => handleClick(number, availableSeats[number])}
          key={number}
        >
          {number}
        </div>
      ))}
    </div>
  );
}
