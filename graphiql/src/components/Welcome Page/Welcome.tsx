import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Login Page/firebase";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useLocalizationContext } from "../context/context";
import Footer from "../Footer/Footer";

function WelcomePage() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const {Localization, setLocalization} = useLocalizationContext();

    return(
        <div>
            <Header/>
            {Localization === 'en' ? <h1>Welcome Page</h1> : <h1>Страница приветствия</h1> }
            {user ? 
            (
            <div>
            {Localization === 'en' ? <h1>Authorized</h1> : <h1>Авторизирован</h1> }
            {Localization === 'en' ? <button onClick={() => navigate("/Main")}>Go to main</button> : <button onClick={() => navigate("/Main")}>Перейти на главную</button> }
            </div>
            )
            : 
            (
            <div>
            {Localization === 'en' ? <h1> Not Authorized</h1> : <h1>Не Авторизирован</h1> }
            {Localization === 'en' ? <button onClick={() => navigate("/Login")}>Login</button> : <button onClick={() => navigate("/Login")}>Войти</button> }
            {Localization === 'en' ? <button onClick={() => navigate("/Registration")}>Registration</button> : <button onClick={() => navigate("/Registration")}>Зарегистрироваться</button> }
            </div>
            )}
            <Footer/>
        </div>
    )
}

export default WelcomePage;