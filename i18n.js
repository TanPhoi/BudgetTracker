import i18n from 'i18next';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/hi';
import {initReactI18next} from 'react-i18next';
import en from '@/locales/en.json';
import vi from '@/locales/vi.json';
import hi from '@/locales/hi.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
    hi: {
      translation: hi,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

moment.locale(i18n.language);
export default i18n;
