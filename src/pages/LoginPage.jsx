import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

const handleLogin = (e) => {
  e.preventDefault();
};

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <form className="mb-20">
          <EmailInput extraClass="mb-6" />
          <PasswordInput extraClass="mb-6" />
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