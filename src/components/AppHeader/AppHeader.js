import styles from "./appheader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`pt-2 pb-2 ${styles.header}`}>
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className="pl-5 pr-5 pt-4 pb-4 mr-2">
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                exact
                to="/"
              >
                <BurgerIcon type="secondary" />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </NavLink>
            </li>
            <li className="pl-5 pr-5 pt-4 pb-4">
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                exact
                to="/orders"
              >
                <ListIcon type="secondary" />
                <p className="text text_type_main-default ml-2">
                  Лента заказов
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.logoWrap}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={`pl-5 pr-5 pt-4 pb-4 ${styles.login}`}>
          <NavLink
            className={styles.link}
            activeClassName={styles.active}
            to="/profile"
          >
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
