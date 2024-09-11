export const getSeats = async (id: string, params: Record<string, boolean>) => {
    const queryString = new URLSearchParams(params as any).toString();
    const url = `https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${queryString}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      throw error;
    }
  };
  