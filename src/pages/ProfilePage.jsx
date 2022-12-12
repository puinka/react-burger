import styles from "./profile.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, logout } from "../services/actions/user";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const data = useSelector((store) => store.user.data);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className={styles.container}>
      <div className={styles.leftcol}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/profile"
              className={styles.link}
              activeClassName={styles.active}
            >
              <p className="text text_type_main-medium">Профиль</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/order"
              className={styles.link}
              activeClassName={styles.active}
            >
              <p className="text text_type_main-medium">История заказов</p>
            </NavLink>
          </li>
          <li>
            <button to="/login" className={styles.link} onClick={handleLogout}>
              <p className="text text_type_main-medium">Выход</p>
            </button>
          </li>
        </ul>
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </div>
      <form>
        <Input
          name="name"
          placeholder="Имя"
          value={data.name}
          icon={"EditIcon"}
          extraClass="mb-6"
          onChange={onChange}
        />
        <EmailInput
          name="email"
          value={data.email}
          icon={"EditIcon"}
          extraClass="mb-6"
          onChange={onChange}
        />
        <PasswordInput
          name="password"
          icon={"EditIcon"}
          extraClass="mb-6"
          value="Password"
        />
      </form>
    </main>
  );
}
