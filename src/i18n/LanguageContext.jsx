import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import ar from "./locales/ar.json";

// Все словари
const dictionaries = {
  en,
  ru,
  ar,
};

const SUPPORTED_LANGS = ["en", "ru", "ar"];
const DEFAULT_LANG = "en";

const LanguageContext = createContext(null);

// Определяем стартовый язык
function getInitialLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    return saved;
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  // side effects при смене языка
  useEffect(() => {
    localStorage.setItem("lang", lang);

    const meta = dictionaries[lang]?.meta;

    document.documentElement.lang = lang;
    document.documentElement.dir = meta?.dir || "ltr";
  }, [lang]);

  // функция перевода
  const t = useMemo(() => {
    return (key) => {
      const parts = key.split(".");

      let value = dictionaries[lang];
      for (const part of parts) {
        value = value?.[part];
      }

      // fallback на EN, если ключа нет
      if (value === undefined) {
        let fallback = dictionaries[DEFAULT_LANG];
        for (const part of parts) {
          fallback = fallback?.[part];
        }
        return fallback ?? key;
      }

      return value;
    };
  }, [lang]);

  const contextValue = useMemo(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Хук для использования в компонентах
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
