import { FC } from "react";
import { TIngredient } from "../../../../utils/types";
import styles from "./orderingredientimage.module.css";

type TOrderIngredientImageProps = {
  item?: TIngredient;
  counter?: number;
};

export const OrderIngredientImage: FC<TOrderIngredientImageProps> = ({
  item,
  counter,
}) => {
  return (
    <>
      {counter ? (
        <div className={styles.hiddencounter}>
          <p className="text text_type_main-default">{`+${counter}`}</p>
        </div>
      ) : null}
      <img
        className={styles.ingredientimg}
        src={item?.image_mobile}
        alt={item?.name}
      ></img>
    </>
  );
};
