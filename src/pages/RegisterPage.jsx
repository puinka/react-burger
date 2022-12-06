import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

import { register } from "../services/actions/user";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form]
  );

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className="mb-20">
          <Input
            extraClass="mb-6"
            type="text"
            placeholder="Имя"
            name="name"
            value={form.name}
            onChange={onChange}
          ></Input>
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
          <Button onClick={handleRegister} htmlType="submit">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{" "}
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
