import "./App.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
