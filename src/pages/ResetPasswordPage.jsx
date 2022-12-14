import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPass } from "../services/actions/user";
import styles from "./form.module.css";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restoreEmail } = useSelector((store) => store.user);

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onPasswordChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPassword(value);
  };

  const onCodeChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCode(value);
  };

  const handleResetPass = (e) => {
    e.preventDefault();
    dispatch(resetPass(password, code));
  };

  useEffect(() => {
    !restoreEmail && history.replace({ pathname: "forgot-password" });
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <form className="mb-20">
          <PasswordInput
            extraClass="mb-6"
            placeholder="Введите новый пароль"
            value={password}
            onChange={onPasswordChange}
          />
          <Input
            extraClass="mb-6"
            placeholder="Введите код из письма"
            value={code}
            onChange={onCodeChange}
          />
          <Button onClick={handleResetPass} htmlType="submit">
            Сохранить
          </Button>
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
