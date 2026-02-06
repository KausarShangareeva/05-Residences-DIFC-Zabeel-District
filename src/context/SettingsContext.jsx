import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const SettingsContext = createContext(null);

const DEFAULT_CURRENCY = "AED";
const DEFAULT_AREA_UNIT = "ft";
const SUPPORTED_CURRENCIES = ["AED", "USD", "EUR"];
const SUPPORTED_AREA_UNITS = ["ft", "m"];

function getInitialCurrency() {
  const saved = localStorage.getItem("currency");
  return SUPPORTED_CURRENCIES.includes(saved) ? saved : DEFAULT_CURRENCY;
}

function getInitialAreaUnit() {
  const saved = localStorage.getItem("areaUnit");
  return SUPPORTED_AREA_UNITS.includes(saved) ? saved : DEFAULT_AREA_UNIT;
}

export function SettingsProvider({ children }) {
  const [currency, setCurrency] = useState(getInitialCurrency);
  const [areaUnit, setAreaUnit] = useState(getInitialAreaUnit);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("areaUnit", areaUnit);
  }, [areaUnit]);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      areaUnit,
      setAreaUnit,
    }),
    [currency, areaUnit],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return context;
}
