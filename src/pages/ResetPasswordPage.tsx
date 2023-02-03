import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "../utils/hooks/useDispatch";
import { useSelector } from "../utils/hooks/useSelector";
import { Link, useHistory } from "react-router-dom";
import { resetPass } from "../services/actions/user";
import styles from "./form.module.css";

const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { restoreEmail } = useSelector((store) => store.user);

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;
    setPassword(value);
  };

  const onCodeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;
    setCode(value);
  };

  const handleResetPass = (evt: FormEvent) => {
    evt.preventDefault();
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
        <form className="mb-20" onSubmit={handleResetPass}>
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
          <Button htmlType="submit">Сохранить</Button>
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

export default ResetPasswordPage;
