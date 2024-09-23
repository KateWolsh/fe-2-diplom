
export const submitOrder = async (orderData) => {
    try {
      const response = await fetch('https://students.netoservices.ru/fe-diplom/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Order submitted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  };