export const calculatePrice = (selectedSeats:number[], typeOfCoachThird: boolean, ticketDirection) => {
    let price = 0;

    selectedSeats.forEach((seatNumber: number) => {
        if (typeOfCoachThird) {
            if (seatNumber >= 33 && seatNumber <= 48) {
                price += ticketDirection.price_info.third.side_price;
            } else if (seatNumber % 2 !== 0 && seatNumber >= 1 && seatNumber <= 31) {
                price += ticketDirection.price_info.third.top_price;
            } else if (seatNumber % 2 === 0 && seatNumber >= 2 && seatNumber <= 32) {
                price += ticketDirection.price_info.third.bottom_price;
            }
        } else {
            if (ticketDirection.price_info.first) {
                price += ticketDirection.price_info.first.bottom_price;
            } else if (ticketDirection.price_info.second) {
                price += ticketDirection.price_info.second.bottom_price;
            } else if (ticketDirection.price_info.fourth) {
                price += ticketDirection.price_info.fourth.bottom_price;
            } else {
                price += ticketDirection.price_info.bottom_price;
            }
        }
    });

    return price;
};