export interface City {
    name: string;
    _id: string;
}

export const getCity = async (city: string): Promise<City[]> => {
    try {
        const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${city}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
};
