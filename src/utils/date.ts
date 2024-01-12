const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
};

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("pt-BR", formatOptions);
}