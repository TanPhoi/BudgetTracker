import moment from 'moment';
import 'moment/locale/vi';

export const formatDateTime = (dateTime: string): string => {
  const [timePart, datePart] = dateTime.split(' | ');
  const formattedDateTime = `${datePart} ${timePart}`;

  try {
    const language = moment.locale() || 'en'; // Ngôn ngữ hiện tại của moment.js
    moment.locale(language);

    const date = moment(formattedDateTime, 'MMM DD, YYYY h:mm A');

    if (!date.isValid()) {
      throw new Error('Invalid date');
    }

    const time = date.format('h:mm A');
    const dateFormatted = date.format(
      language === 'vi' ? 'D MMMM YYYY' : 'MMM DD, YYYY',
    );

    return `${time} | ${dateFormatted}`;
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid Date';
  }
};
