import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../Login Page/firebase";
import { useNavigate } from "react-router-dom";
import { useLocalizationContext } from "../context/context";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isSticky, setSticky] = useState(false);
  const { Localization, setLocalization } = useLocalizationContext();

  function setLanguage() {
    if (Localization === "en") {
      setLocalization("ru");
    } else {
      setLocalization("en");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`App ${isSticky ? "sticky" : ""}`}>
      {Localization === "en" ? (
        <div>
          <button onClick={() => navigate("/")}>Go to Welcome page</button>
          <button onClick={setLanguage}>Localization</button>
          {user ? <button onClick={logout}>Logout</button> : null}
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/")}>
            Перейти к странице приветствия
          </button>
          <button onClick={setLanguage}>Локализация</button>
          {user ? <button onClick={logout}>Выйти</button> : null}
        </div>
      )}
    </header>
  );
}

export default Header;
