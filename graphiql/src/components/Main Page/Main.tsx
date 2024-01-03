import Footer from "../Footer/Footer";
import GraphQL from "../GraphQL/GraphQL";
import Header from "../Header/Header";
import { useLocalizationContext } from "../context/context";

function MainPage() {
  const { Localization } = useLocalizationContext();

  return (
    <div>
      <Header />
      {Localization === "en" ? <h1>Main Page</h1> : <h1>Главная</h1>}
      <GraphQL />
      <Footer />
    </div>
  );
}

export default MainPage;
