import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styles from "./form.module.css";

import { login } from "../services/actions/user";

export default function LoginPage() {
  const dispatch = useDispatch();

  const isUser = useSelector((store) => store.user.data);
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [form]
  );

  if (isUser) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <form className="mb-20">
          <EmailInput
            extraClass="mb-6"
            name="email"
            value={form.email}
            onChange={onChange}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            value={form.password}
            onChange={onChange}
          />
          <Button onClick={handleLogin} htmlType="submit">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{" "}
          <Link className={styles.link} to="/register">
            Зарегистрироваться
          </Link>
        </p>

        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link className={styles.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
}
