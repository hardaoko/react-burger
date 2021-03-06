import React, { useEffect, useState } from "react";
import styles from "./Registration.module.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getRegistration } from "../../services/actions/profile";
import { useMyDispatch, useMySelector } from "../../utils/types";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { registrationSuccess, isAuth } = useMySelector((store) => store.profile);
  const dispatch = useMyDispatch();
  const history = useHistory();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email && password) {
      dispatch(getRegistration(email, password, name));
    }
  };

  useEffect(() => {
    registrationSuccess && history.push("/");
  }, [registrationSuccess, history]);

  if (isAuth) {
    return <Redirect exact to="/" />;
  } else {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <div className="mt-6 mb-6">
            <Input
              onChange={onChangeName}
              placeholder="Имя"
              value={name}
              name={"name"}
            />
          </div>
          <div className="mb-6">
            <Input
              onChange={onChangeEmail}
              placeholder="E-mail"
              value={email}
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
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          {"Уже зарегистрированы? "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    );
  }
};

export default Registration;
