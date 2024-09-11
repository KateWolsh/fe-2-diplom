export const getTickets = async (params: Record<string, any>) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://students.netoservices.ru/fe-diplom/routes?${queryString}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      throw error; // Пробросить ошибку, чтобы компонент мог обработать её
    }
  };
  