import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

const handleSignup = (e) => {
  e.preventDefault();
};

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className="mb-20">
          <Input extraClass="mb-6" type="text" placeholder="Имя"></Input>
          <EmailInput extraClass="mb-6" />
          <PasswordInput extraClass="mb-6" />
          <Button onClick={handleSignup} htmlType="submit">
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
