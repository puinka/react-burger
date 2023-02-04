import { useDispatch } from "../utils/hooks/useDispatch";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

import { register } from "../services/actions/user";
import { useForm } from "../utils/hooks/useForm";
import { FC, FormEvent } from "react";

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(register(values));
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
            value={values.name}
            onChange={handleChange}
          ></Input>
          <EmailInput
            extraClass="mb-6"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            value={values.password}
            onChange={handleChange}
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
