import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../services/actions/profile";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginSuccess } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(getLogin(email, password));
  };

  useEffect(() => {
    loginSuccess && history.push("/");
  }, [loginSuccess, history]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <div className="mt-6 mb-6">
          <Input
            onChange={onChangeEmail}
            value={email}
            placeholder="Е-mail"
            name={"email"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
          />
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вы — новый пользователь? "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        {"Забыли пароль? "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
