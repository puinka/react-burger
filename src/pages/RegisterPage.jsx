import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

import { register } from "../services/actions/user";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className="mb-20" onSubmit={handleRegister}>
          <Input
            extraClass="mb-6"
            type="text"
            placeholder="Имя"
            name="name"
            value={name}
            onChange={onNameChange}
          ></Input>
          <EmailInput
            extraClass="mb-6"
            name="email"
            value={email}
            onChange={onEmailChange}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            value={password}
            onChange={onPasswordChange}
          />
          <Button htmlType="submit">Зарегистрироваться</Button>
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
};

export default RegisterPage;
