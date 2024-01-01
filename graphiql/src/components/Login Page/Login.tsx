import { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useLocalizationContext } from "../context/context";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ENschemaLogin, RUschemaLogin } from "../Validation/Shema";


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const {Localization, setLocalization} = useLocalizationContext();

    const initialSchema = Localization === "en" ? ENschemaLogin : RUschemaLogin;

    const {
        register,
        handleSubmit,
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
            navigate("/main")
        }
      }, [user, loading]);

    return (
        <div>
            <Header/>
            {Localization === 'en' ? <h1>Login Page</h1> : <h1>Логин</h1>}
        <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          {...register("Email")}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={Localization === 'en' ? "E-mail Address" : "E-mail адрес"}
        />
        <p>{errors.Email?.message}</p>
        <input
          type="password"
          className="login__textBox"
          value={password}
          {...register("Password")}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={Localization === 'en' ? "Password" : "Пароль"}
        />
        <p>{errors.Password?.message}</p>
        <input type="submit" 
         disabled={!isValid}
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
          value={Localization === 'en' ? "Login" : "Логин"}
          />
        </div>
        <Footer/>
        </div>
    );
};

export default LoginPage;