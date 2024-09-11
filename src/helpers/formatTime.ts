export const formatTime = (datetime: number): string => {
    return new Date(datetime * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}