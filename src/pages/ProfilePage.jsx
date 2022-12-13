import styles from "./profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, logout, updateUser } from "../services/actions/user";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.user.data);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(name, email, password));
  };

  const onNameChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setName(value);
  };

  const onEmailChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEmail(value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPassword(value);
  };

  const handleCancelUpdate = () => {
    setName(data.name);
    setEmail(data.email);
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
          value={name}
          icon={"EditIcon"}
          extraClass="mb-6"
          onChange={onNameChange}
        />
        <EmailInput
          name="email"
          value={email}
          icon={"EditIcon"}
          extraClass="mb-6"
          onChange={onEmailChange}
        />
        <PasswordInput
          name="password"
          icon={"EditIcon"}
          extraClass="mb-6"
          value="Password"
          onChange={onPasswordChange}
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
