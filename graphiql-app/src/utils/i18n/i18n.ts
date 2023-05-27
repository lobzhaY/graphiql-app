import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    supportedLngs: ['en', 'ru'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: 'src/utils/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
