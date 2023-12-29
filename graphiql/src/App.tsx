import { useState } from "react";
import { LocalizationContext } from "./components/context/context"

export function sum(a: number, b: number) {
  return a + b
}

function App() {
  const [Localization, setLocalization] = useState<string | undefined>('en');

  function setLanguage() {
    if (Localization === 'en') {
      setLocalization("ru");
      console.log(Localization);
    } else {
      setLocalization("en");
      console.log(Localization);
    }
  }

  return (
    <LocalizationContext.Provider value={{Localization, setLocalization}}>
    <h1>Hello world!</h1>
    <button onClick={setLanguage}>Localization</button>
    </LocalizationContext.Provider>
  )
}

export default App
