import { useState } from "react";
import { LocalizationContext } from "./components/context/context";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/Welcome Page/Welcome";
import LoginPage from "./components/Login Page/Login";
import PrivateRoute from "./components/router/privateRoute";
import MainPage from "./components/Main Page/Main";

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
    {Localization === 'en' ? <h1>Hello world!</h1> : <h1>Привет мир!</h1>}
    <button onClick={setLanguage}>Localization</button>

    <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute />}>
      <Route path="/Main" element={<MainPage/>}/>
      </Route>
      <Route path="/Login" element={<LoginPage/>}/>
      <Route path="/" element={<WelcomePage/>}/>
    </Routes>
    </BrowserRouter>

    </LocalizationContext.Provider>
  )
}

export default App
