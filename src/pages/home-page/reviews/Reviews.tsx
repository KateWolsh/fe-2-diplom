import './style.css';
import { Galleria } from 'primereact/galleria';
import { useState } from 'react';
import { reviews } from './data'
import { Review } from './data'

const Reviews = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemTemplate = (review: Review) => {
        return (
            <div className="review-slide">
                <div className="review-item">
                    {review.image && <img src={review.image} alt={review.author} className="review-image" />}
                    <h4>{review.author}</h4>
                    <p>{review.text}</p>
                </div>
            </div>
        );
    };

    const groupedReviews = [];
    for (let i = 0; i < reviews.length; i += 2) {
        groupedReviews.push(reviews.slice(i, i + 2));
    }

    const indicator = (index: number, isActive: boolean) => {
        return (
            <span
                className={`custom-indicator ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                style={{
                    backgroundColor: isActive ? '#C4C4C4' : '#E5E5E5',
                    borderRadius: '50%',
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    margin: '0 4px',
                }}
            ></span>
        );
    };

    return (
        <div className="review-slider-container">
            <div className="review-slider">
                <div className='header-slider'>ОТЗЫВЫ</div>
                <Galleria
                    value={groupedReviews}
                    item={(group) => (
                        <div className="review-group">
                            {group.map(itemTemplate)}
                        </div>
                    )}
                    numVisible={1}
                    circular={true}
                    showThumbnails={false}
                    showIndicators={true}
                    indicator={(index: number) => indicator(index, activeIndex === index)}
                />
            </div>
        </div>
    );
};

export default Reviews;

