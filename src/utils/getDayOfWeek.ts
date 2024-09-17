import {t} from 'i18next';

export const getDayOfWeek = (date: Date): string => {
  const day = [
    t('sun'),
    t('mon'),
    t('tue'),
    t('wed'),
    t('thu'),
    t('fri'),
    t('sat'),
  ];

  return day[date.getDay()];
};
