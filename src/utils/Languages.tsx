import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const spanish = require("../lang/es.json");
const valencian = require("../lang/va.json");
const english = require("../lang/en.json");

const initLanguages = () =>
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: "v3",
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: {
        es: spanish,
        en: english,
        va: valencian,
      },
      lng: "es", // if you're using a language detector, do not define the lng option
      fallbackLng: "es",

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });

export default initLanguages;
