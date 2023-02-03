import styles from "./profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "../utils/hooks/useDispatch";
import { useSelector } from "../utils/hooks/useSelector";
import { getUser, logout, updateUser } from "../services/actions/user";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import { selectUser } from "../services/selectors/userSelectors";

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectUser);
  const [name, setName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleUpdate = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(updateUser(name, email, password));
  };

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;
    if (value.length > 0) setName(value);
  };

  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;
    if (value.length > 0) setEmail(value);
  };

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;
    setPassword(value);
  };

  const handleCancelUpdate = () => {
    setName(data?.name);
    setEmail(data?.email);
  };

  return (
    <main className={styles.container}>
      <ProfileNav />
      <form onSubmit={handleUpdate}>
        <Input
          name="name"
          placeholder="Имя"
          value={name ? name : ""}
          icon={"EditIcon"}
          extraClass="mb-6"
          onChange={onNameChange}
        />
        <EmailInput
          name="email"
          placeholder="Email"
          value={email ? email : ""}
          isIcon
          extraClass="mb-6"
          onChange={onEmailChange}
        />
        <PasswordInput
          name="password"
          icon={"EditIcon"}
          extraClass="mb-6"
          value="Password"
          onChange={onPasswordChange}
        />
        <div>
          <Button
            type="secondary"
            htmlType="reset"
            onClick={handleCancelUpdate}
          >
            <p>Отмена</p>
          </Button>
          <Button type="primary" htmlType="submit">
            <p>Сохранить</p>
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ProfilePage;
