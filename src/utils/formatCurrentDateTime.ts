export const formatCurrentDateTime = (): string => {
  const now = new Date();

  const language = 'en';

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };

  const time = now.toLocaleTimeString(language, timeOptions);
  const date = now.toLocaleDateString(language, dateOptions);

  return `${time} | ${date}`;
};
