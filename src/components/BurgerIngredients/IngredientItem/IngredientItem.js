import styles from "./ingredientitem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const mock = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const IngredientItem = () => {
  return (
    <li className={`pl-4 pr-4 pb-3 mr-6 mb-8 ${styles.container}`}>
      <img src={mock.image} />
      <div className={`mt-1 mb-1 ${styles.price}`}>
        <p className="text text_type_digits-default mr-2">{mock.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{mock.name}</p>
    </li>
  );
};

export default IngredientItem;
