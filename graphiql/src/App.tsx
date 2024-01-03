import { useState } from "react";
import { LocalizationContext } from "./components/context/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/Welcome Page/Welcome";
import LoginPage from "./components/Login Page/Login";
import PrivateRoute from "./components/router/privateRoute";
import MainPage from "./components/Main Page/Main";
import RegistrationPage from "./components/Registration Page/Registration";

function App() {
  const [Localization, setLocalization] = useState<string | undefined>("en");

  return (
    <LocalizationContext.Provider value={{ Localization, setLocalization }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/Main" element={<MainPage />} />
          </Route>
          <Route path="/Registration" element={<RegistrationPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationContext.Provider>
  );
}

export default App;
