import styles from "./appheader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`pt-2 pb-2 ${styles.header}`}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className="pl-5 pr-5 pt-4 pb-4 mr-2">
              <a className={styles.link} href="#">
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </a>
            </li>
            <li className="pl-5 pr-5 pt-4 pb-4">
              <a className={styles.link} href="#">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive ml-2">
                  Лента заказов
                </p>
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.logoWrap}>
          <Logo />
        </div>
        <div className={`pl-5 pr-5 pt-4 pb-4 ${styles.login}`}>
          <NavLink className={styles.link} to="/profile">
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
