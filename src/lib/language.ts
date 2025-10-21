import { useEffect, useState } from 'react';
import type { Language } from './i18n';

const STORAGE_KEY = 'preferred-language';
const DEFAULT_LANGUAGE: Language = 'en';

const listeners = new Set<(language: Language) => void>();

let currentLanguage: Language = DEFAULT_LANGUAGE;
let initialized = false;

const isBrowser = typeof window !== 'undefined';

const isLanguage = (value: unknown): value is Language =>
  value === 'en' || value === 'fr';

const setDocumentLanguage = (language: Language) => {
  if (!isBrowser) {
    return;
  }

  document.documentElement.setAttribute('lang', language);
  document.documentElement.setAttribute('data-language', language);
};

const detectInitialLanguage = (): Language => {
  if (!isBrowser) {
    return DEFAULT_LANGUAGE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) {
    return stored;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('fr')) {
    return 'fr';
  }

  if (browserLanguage.startsWith('en')) {
    return 'en';
  }

  return DEFAULT_LANGUAGE;
};

const ensureInitialized = () => {
  if (initialized || !isBrowser) {
    return;
  }

  initialized = true;
  currentLanguage = detectInitialLanguage();
  setDocumentLanguage(currentLanguage);

  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    const value = event.newValue;
    if (!isLanguage(value) || value === currentLanguage) {
      return;
    }

    currentLanguage = value;
    setDocumentLanguage(currentLanguage);
    listeners.forEach((listener) => listener(currentLanguage));
  });
};

const notify = () => {
  listeners.forEach((listener) => listener(currentLanguage));
};

export const getLanguage = (): Language => {
  ensureInitialized();
  return currentLanguage;
};

export const setLanguage = (language: Language) => {
  ensureInitialized();

  if (language === currentLanguage) {
    return;
  }

  currentLanguage = language;
  if (isBrowser) {
    window.localStorage.setItem(STORAGE_KEY, language);
  }
  setDocumentLanguage(language);
  notify();
};

export const subscribe = (listener: (language: Language) => void) => {
  ensureInitialized();
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => getLanguage());

  useEffect(() => {
    const unsubscribe = subscribe(setLanguageState);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    language,
    setLanguage,
  };
};

export type { Language } from './i18n';
