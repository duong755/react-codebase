import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import resources from "./locale";

const DEFAULT_NAMESPACE = "common";

i18next.use(initReactI18next).init({
  resources: resources,
  defaultNS: DEFAULT_NAMESPACE,
  cleanCode: true,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
