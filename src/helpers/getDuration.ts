export const getDuration = (startTime: number, endTime: number): { hours: number, minutes: number } => {
    const start = new Date(startTime * 1000);
    const end = new Date(endTime * 1000);
    
    const durationMs = end.getTime() - start.getTime();
    
    const durationMin = Math.floor(durationMs / (1000 * 60));
    
    const hours = Math.floor(durationMin / 60);
    const minutes = durationMin % 60;
    
    return { hours, minutes };
}