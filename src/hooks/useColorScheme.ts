import { useEffect, useSyncExternalStore } from "react";

type ColorScheme = "light" | "dark";
type ColorSchemePreference = "system" | ColorScheme;

const STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "color-scheme-change";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function getMediaQuery() {
  return window.matchMedia(DARK_MODE_QUERY);
}

function getStoredPreference(): ColorSchemePreference {
  try {
    const storedPreference = localStorage.getItem(STORAGE_KEY);
    return storedPreference === "light" || storedPreference === "dark"
      ? storedPreference
      : "system";
  } catch (error) {
    console.warn("Unable to read the color-scheme preference.", error);
    return "system";
  }
}

function getSystemColorScheme(): ColorScheme {
  return getMediaQuery().matches ? "dark" : "light";
}

function subscribeToPreference(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function subscribeToSystemPreference(onStoreChange: () => void) {
  const mediaQuery = getMediaQuery();
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function setPreference(preference: ColorSchemePreference) {
  try {
    if (preference === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch (error) {
    console.warn("Unable to persist the color-scheme preference.", error);
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function applyColorScheme(
  preference: ColorSchemePreference,
  systemColorScheme: ColorScheme
) {
  const colorScheme = preference === "system" ? systemColorScheme : preference;
  const colorSchemeMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]'
  );

  if (colorSchemeMeta) {
    colorSchemeMeta.content =
      preference === "system" ? "light dark" : preference;
  }
  document.documentElement.classList.toggle("dark", colorScheme === "dark");
}

export function useColorScheme() {
  const preference = useSyncExternalStore<ColorSchemePreference>(
    subscribeToPreference,
    getStoredPreference,
    () => "system"
  );
  const systemColorScheme = useSyncExternalStore<ColorScheme>(
    subscribeToSystemPreference,
    getSystemColorScheme,
    () => "light"
  );
  const colorScheme = preference === "system" ? systemColorScheme : preference;

  useEffect(() => {
    applyColorScheme(preference, systemColorScheme);
  }, [preference, systemColorScheme]);

  const toggleColorScheme = () => {
    const nextColorScheme: ColorScheme =
      colorScheme === "dark" ? "light" : "dark";
    setPreference(
      nextColorScheme === systemColorScheme ? "system" : nextColorScheme
    );
  };

  return { colorScheme, toggleColorScheme };
}
