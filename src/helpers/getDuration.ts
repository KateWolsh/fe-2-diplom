export const getDuration = (startTime: number, endTime: number): { hours: number, minutes: number } => {
    // Преобразуем UNIX-время в миллисекунды
    const start = new Date(startTime * 1000);
    const end = new Date(endTime * 1000);
    
    // Вычисляем разницу в миллисекундах
    const durationMs = end.getTime() - start.getTime();
    
    // Преобразуем разницу в минуты
    const durationMin = Math.floor(durationMs / (1000 * 60));
    
    // Вычисляем часы и минуты
    const hours = Math.floor(durationMin / 60);
    const minutes = durationMin % 60;
    
    return { hours, minutes };
}