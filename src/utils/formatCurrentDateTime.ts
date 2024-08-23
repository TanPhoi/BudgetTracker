export const formatCurrentDateTime = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const time = now.toLocaleTimeString('en-US', options);
  const date = now.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return `${time} | ${date}`;
};
