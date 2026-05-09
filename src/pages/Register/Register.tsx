import { useEffect, type FormEvent } from "react";
import styles from "./Register.module.css";
import Heading from "../../components/Search/Headling/Heading";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/user.slice";
import type { AppDispath, RootState } from "../../store/store";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

function Register() {
  const dispatch = useDispatch<AppDispath>();
  const navigate = useNavigate();
  const { jwt, registerErrorMessage } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt]);

  const registration = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & RegisterForm; // приводим к типу e.target и при этом он должен обладать некоторыми значениями type RegisterForm
    const { email, password, name } = target; // const email = target.email; const password = target.password

    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    );
  };
  return (
    <div className={styles.login}>
      <Heading> Регистрация </Heading>
      {registerErrorMessage && (
        <div className={styles.error}>{registerErrorMessage}</div>
      )}
      <form className={styles.form} onSubmit={registration}>
        <div className={styles.field}>
          <label htmlFor="name">Имя</label>

          <Input type="text" id="name" name="name" placeholder="Name" />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>

          <Input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Пароль</label>

          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button className={styles.button} type="submit">
          Зарегистрироваться
        </button>
        <div className={styles["links"]}>
          <div>Есть аккаунт?</div>
          <div>
            <Link className={styles.button} to="/auth/login">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
