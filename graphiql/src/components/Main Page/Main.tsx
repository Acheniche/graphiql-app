import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocalizationContext } from "../context/context";

function MainPage() {

    const {Localization, setLocalization} = useLocalizationContext();
    
    return (
        <div>
            <Header/>
            {Localization === 'en' ? <h1>Main Page</h1> : <h1>Главная</h1>}
        <Footer/>
        </div>
    )
}

export default MainPage;