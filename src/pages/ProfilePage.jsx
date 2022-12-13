import styles from "./profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, logout, updateUser } from "../services/actions/user";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.user.data);
  const [form, setValue] = useState({ ...data, password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [form]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser(form));
    },
    [form, dispatch]
  );

  const handleCancelUpdate = () => {
    setValue({ ...data });
  };

  return (
    <main className={styles.container}>
      <div className={styles.nav}>
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
          className={`${styles.caption} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </div>
      <form>
        <Input
          name="name"
          placeholder="Имя"
          value={form.name}
          icon={"EditIcon"}
          extraClass="mb-6"
          onChange={onChange}
        />
        <EmailInput
          name="email"
          value={form.email}
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
        <div>
          <Button
            type="secondary"
            htmlType="reset"
            onClick={handleCancelUpdate}
          >
            <p>Отмена</p>
          </Button>
          <Button type="primary" htmlType="submit" onClick={handleUpdate}>
            <p>Сохранить</p>
          </Button>
        </div>
      </form>
    </main>
  );
}
