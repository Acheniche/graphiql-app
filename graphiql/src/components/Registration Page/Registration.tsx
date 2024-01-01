import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../Login Page/firebase";
import Header from "../Header/Header";
import { useLocalizationContext } from "../context/context";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ENschema, RUschema } from "../Validation/Shema";

function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { Localization } = useLocalizationContext();

  const initialSchema = Localization === "en" ? ENschema : RUschema;

  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(initialSchema),
  });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/main");
    }
  }, [user, loading, navigate]);

  const registerFB = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div>
      <Header />
      {Localization === "en" ? <h1>Registration</h1> : <h1>Регистрация</h1>}
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          {...register("Name")}
          onChange={(e) => setName(e.target.value)}
          placeholder={Localization === "en" ? "Full Name" : "Имя"}
        />
        <p>{errors.Name?.message}</p>
        <input
          type="text"
          className="register__textBox"
          value={email}
          {...register("Email")}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            Localization === "en" ? "E-mail Address" : "E-mail адрес"
          }
        />
        <p>{errors.Email?.message}</p>
        <input
          type="password"
          className="register__textBox"
          value={password}
          {...register("Password")}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={Localization === "en" ? "Password" : "Пароль"}
        />
        <p>{errors.Password?.message}</p>
        <input
          type="submit"
          disabled={!isValid}
          className="register__btn"
          onClick={registerFB}
          value={Localization === "en" ? "Send" : "Отправить"}
        />
      </div>
      <div>
        {Localization === "en" ? (
          <h2>
            Already have an account? <Link to="/Login">Login</Link> now.
          </h2>
        ) : (
          <h2>
            Уже есть аккаунт? <Link to="/Login">Войдите</Link> сейчас.
          </h2>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RegistrationPage;
