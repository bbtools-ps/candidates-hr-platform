import "i18next";
import type translations from "../public/locales/en/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translations";
    resources: {
      translations: typeof translations;
    };
  }
}
