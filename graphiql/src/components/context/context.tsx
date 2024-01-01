import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type LocalizationContext = {
    Localization: string | undefined;
    setLocalization: Dispatch<SetStateAction<string | undefined>>;
  }

export const LocalizationContext = createContext<LocalizationContext | undefined>(undefined);

export function useLocalizationContext() {
    const context = useContext(LocalizationContext);
    if (!context) {
      throw new Error('');
    }
    return context;
  };