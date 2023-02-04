import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useCallback } from "react";
import { useDispatch } from "../utils/hooks/useDispatch";
import { useSelector } from "../utils/hooks/useSelector";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./form.module.css";
import { login } from "../services/actions/user";
import { useForm } from "../utils/hooks/useForm";
import { selectUser } from "../services/selectors/userSelectors";
import { TLocation } from "../utils/types";

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();
  const user = useSelector(selectUser);

  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(login(values));
    },
    [dispatch, values]
  );

  if (user) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <form className="mb-20" onSubmit={handleLogin}>
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
          <Button htmlType="submit">Войти</Button>
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
};

export default LoginPage;
