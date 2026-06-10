import { createContext, useContext } from 'react';
import type { LanguageOption } from '../components/types/languages';

export interface AppProps {
  companyName: string;
  country: string;
  languages: LanguageOption[];
}

export const AppContext = createContext<AppProps | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppContext.Provider");
  return context;
}