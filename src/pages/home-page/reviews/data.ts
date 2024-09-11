import girl from '../../../img/girl.png'
import men from '../../../img/men.png'

export interface Review {
    id: number;
    text: string;
    author: string;
    image: string;
}
export const reviews: Review[] = [
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