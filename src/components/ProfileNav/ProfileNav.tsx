import { useDispatch } from "../../utils/hooks/useDispatch";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/actions/user";
import styles from "./profilenav.module.css";
import { FC } from "react";

const ProfileNav: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink
            exact
            to="/profile"
            className={styles.link}
            activeClassName={styles.active}
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/profile/orders"
            className={styles.link}
            activeClassName={styles.active}
          >
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
        </li>
        <li>
          <button className={styles.link} onClick={handleLogout}>
            <p className="text text_type_main-medium">Выход</p>
          </button>
        </li>
      </ul>
      <p
        className={`${styles.caption} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileNav;
