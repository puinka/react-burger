import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { sendResetPassEmail } from "../services/actions/user";
import styles from "./form.module.css";

export default function ForgotPasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onEmailChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEmail(value);
  };

  const handleResetPass = (e) => {
    e.preventDefault();
    dispatch(sendResetPassEmail(email, history));
  };

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <form className="mb-20" onSubmit={handleResetPass}>
          <EmailInput
            extraClass="mb-6"
            placeholder="Укажите e-mail"
            value={email}
            onChange={onEmailChange}
          />
          <Button htmlType="submit">Восстановить</Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{" "}
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
