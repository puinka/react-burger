import styles from "./app.module.css";
import { URL } from "../../utils/constants.js";
import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const [serverData, setServerData] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setServerData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {serverData && <BurgerIngredients data={serverData} />}
        {serverData && <BurgerConstructor data={serverData} />}
      </main>
    </div>
  );
}

export default App;
