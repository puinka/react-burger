import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

const handleReset = (e) => {
  e.preventDefault();
};

export default function ForgotPasswordPage() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <form className="mb-20">
          <EmailInput extraClass="mb-6" placeholder="Укажите e-mail" />
          <Button onClick={handleReset} htmlType="submit">
            Восстановить
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
