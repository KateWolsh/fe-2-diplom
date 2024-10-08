import React, { useEffect, useState } from 'react';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import './style.css'
import { useSearchContext } from '../../hooks/useSearchContext ';

interface RangeSliderProps {
    header: string
    minLabel?: string;
    maxLabel?: string;
    minValue: number;
    maxValue: number;
    initialRange: [number, number];
    step?: number;
    type: 'price' | 'time';
    onSubmit: (range: [number, number]) => void;
    id?: string;
}

const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({ type, header, minLabel, maxLabel, minValue, maxValue, initialRange, step = 1, onSubmit, id }) => {
    const [rangeValues, setRangeValues] = useState<[number, number]>(initialRange);
    const { setPriceFrom, setPriceTo, setDeparture, setArrival} = useSearchContext();
    const [debouncedRange, setDebouncedRange] = useState<[number, number]>(initialRange);

    useEffect(() => {
        onSubmit(rangeValues);
    
        if (type === 'price') {
            setPriceFrom(rangeValues[0]);
            setPriceTo(rangeValues[1]);
        } else if (type === 'time' && id) {
            if(id === "outbound_departure") {
                setDeparture((prev) => ({
                    ...prev,
                    startDepartureHourFrom: rangeValues[0],
                    startDepartureHourTo: rangeValues[1],
                  }));
            }
            if (id === "outbound_arrival") {
                setDeparture((prev) => ({
                    ...prev,
                    endDepartureHourFrom: rangeValues[0],
                    endDepartureHourTo: rangeValues[1],
                  }));
            }
            if (id === "inbound_departure") {
                setArrival((prev) => ({
                    ...prev,
                    startArrivalHourFrom: rangeValues[0],
                    startArrivalHourTo: rangeValues[1],
                  }));
            }
            if (id === "inbound_arrival") {
                setArrival((prev) => ({
                    ...prev,
                    endArrivalHourFrom: rangeValues[0],
                    endArrivalHourTo: rangeValues[1],
                }));
            }
        }
    }, [rangeValues, type, id]);

    const handleRangeChange = (e: SliderChangeEvent) => {
        const newValue = e.value as [number, number];
        setRangeValues(newValue);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedRange(rangeValues);
        }, 500);

        return () => clearTimeout(timerId);
    }, [rangeValues]);

    useEffect(() => {
        onSubmit(debouncedRange);
    }, [debouncedRange, onSubmit]);
    
    const leftPosition = ((rangeValues[0] - minValue) / (maxValue - minValue)) * 100;
    const rightPosition = ((rangeValues[1] - minValue) / (maxValue - minValue)) * 100;

    return (
        <div className='slider-container slider-container-for-time'>
            <h3 className='slider-header price'>{header}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px', position: 'relative' }}>
                <Slider
                    value={rangeValues}
                    onChange={handleRangeChange}
                    range
                    min={minValue}
                    max={maxValue}
                    step={step}
                    id={id}
                />
                <span style={{ left: `${leftPosition}%` }} className="range-value-left">
                    {type === 'time' ? convertMinutesToTime(rangeValues[0]) : rangeValues[0]}
                </span>
                <span style={{ left: `${rightPosition}%` }} className="range-value-right">
                    {type === 'time' ? convertMinutesToTime(rangeValues[1]) : rangeValues[1]}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span className="min-price">
                        {type === 'time' ? convertMinutesToTime(minValue) : minValue}
                    </span>
                    <span className="max-price">
                        {type === 'time' ? convertMinutesToTime(maxValue) : maxValue}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
