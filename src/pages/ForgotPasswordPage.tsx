import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "../utils/hooks/useDispatch";
import { Link, useHistory } from "react-router-dom";
import { sendResetPassEmail } from "../services/actions/user";
import styles from "./form.module.css";

const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;
    setEmail(value);
  };

  const handleResetPass = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
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
};

export default ForgotPasswordPage;
