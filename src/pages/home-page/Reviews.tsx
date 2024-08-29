import '../home-page/home-page-style.css';
import { Galleria } from 'primereact/galleria';
import girl from '../../img/girl.png'
import men from '../../img/men.png'
import { useState } from 'react';

interface Review {
    id: number;
    text: string;
    author: string;
    image: string;
}
const reviews: Review[] = [
    {
        id: 1,
        text: " “Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.”",
        author: "Екатерина Вальнова",
        image: girl
    },
    {
        id: 2,
        text: "СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездк.",
        author: "Евгений Стрыкало",
        image: men
    },
    {
        id: 3,
        text: " Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
        author: "Лариса Вальнова",
        image: girl
    },
    {
        id: 4,
        text: "СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездк.",
        author: "Евгений Приходько",
        image: men
    }
];

const Reviews = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    // Function to create a slide with two reviews
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

    // Group reviews into pairs for display
    const groupedReviews = [];
    for (let i = 0; i < reviews.length; i += 2) {
        groupedReviews.push(reviews.slice(i, i + 2));
    }

    // Custom indicator function
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

