import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import "./CountrySelect.css";
import { countries } from "../data/countries";

const ruAliases = {
  AE: "ОАЭ Объединенные Арабские Эмираты Эмираты",
  SA: "Саудовская Аравия",
  QA: "Катар",
  KW: "Кувейт",
  OM: "Оман",
  BH: "Бахрейн",
  US: "США Соединенные Штаты Америка",
  GB: "Великобритания Соединенное Королевство",
  DE: "Германия",
  FR: "Франция",
  IT: "Италия",
  ES: "Испания",
  RU: "Россия",
  IN: "Индия",
  PK: "Пакистан",
  CN: "Китай",
  JP: "Япония",
  KR: "Южная Корея",
  AU: "Австралия",
  CA: "Канада",
  BR: "Бразилия",
  MX: "Мексика",
  TR: "Турция",
  EG: "Египет",
  MA: "Марокко",
  ZA: "ЮАР Южная Африка",
  NG: "Нигерия",
  KE: "Кения",
  SE: "Швеция",
  NO: "Норвегия",
  DK: "Дания",
  NL: "Нидерланды Голландия",
  CH: "Швейцария",
  AT: "Австрия",
  BE: "Бельгия",
  PT: "Португалия",
  GR: "Греция",
  PL: "Польша",
  UA: "Украина",
  RO: "Румыния",
  BG: "Болгария",
  CZ: "Чехия",
  HU: "Венгрия",
  IL: "Израиль",
  JO: "Иордания",
  LB: "Ливан",
  IQ: "Ирак",
  IR: "Иран",
  SG: "Сингапур",
  MY: "Малайзия",
  TH: "Таиланд Тайланд",
  VN: "Вьетнам",
  PH: "Филиппины",
  ID: "Индонезия",
  HK: "Гонконг",
};

const CountrySelect = ({ value, onChange, searchPlaceholder, emptyLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }
    searchRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [...countries].sort((a, b) => {
        if (a.popular === b.popular) {
          return a.name.localeCompare(b.name);
        }
        return a.popular ? -1 : 1;
      });
    }

    const digits = normalized.replace(/[^0-9]/g, "");
    return countries.filter((country) => {
      const matchName = country.name.toLowerCase().includes(normalized);
      const matchCode = country.code.toLowerCase().includes(normalized);
      const matchRu = (ruAliases[country.code] || "")
        .toLowerCase()
        .includes(normalized);
      const matchDial =
        digits.length > 0 &&
        country.dial.replace(/[^0-9]/g, "").includes(digits);
      return matchName || matchCode || matchRu || matchDial;
    });
  }, [query]);

  const handleSelect = (country) => {
    onChange(country);
    setIsOpen(false);
  };

  return (
    <div className="country-select" ref={containerRef}>
      <button
        type="button"
        className="country-select__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="country-select__flag">
          <ReactCountryFlag
            countryCode={value.code}
            svg
            aria-label={value.name}
            className="country-flag"
          />
        </span>
        <span className="country-select__dial">{value.dial}</span>
        <span className={`country-select__chevron ${isOpen ? "open" : ""}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="country-select__dropdown">
          <div className="country-select__search">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </div>
          <div className="country-select__list" role="listbox">
            {filtered.length === 0 ? (
              <div className="country-select__empty">{emptyLabel}</div>
            ) : (
              filtered.map((country) => (
                <button
                  type="button"
                  className="country-select__item"
                  key={`${country.code}-${country.dial}`}
                  onClick={() => handleSelect(country)}
                >
                  <span className="country-select__flag">
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      aria-label={country.name}
                      className="country-flag"
                    />
                  </span>
                  <span className="country-select__name">{country.name}</span>
                  <span className="country-select__dial">{country.dial}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
