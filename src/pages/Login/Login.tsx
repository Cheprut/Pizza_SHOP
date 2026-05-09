import { useEffect, type FormEvent } from "react";
import styles from "./Login.module.css";
import Heading from "../../components/Search/Headling/Heading";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user.slice";
import type { AppDispath, RootState } from "../../store/store";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const dispatch = useDispatch<AppDispath>();
  const navigate = useNavigate();
  const { jwt, loginErrorMessage } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt]);

  const loginUser = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & LoginForm; // приводим к типу e.target и при этом он должен обладать некоторыми значениями type RegisterForm
    const { email, password } = target; // const email = target.email; const password = target.password

    dispatch(
      login({
        email: email.value,
        password: password.value,
      }),
    );
  };
  return (
    <div className={styles.login}>
      <Heading> Авторизация </Heading>
      {loginErrorMessage && (
        <div className={styles.error}>{loginErrorMessage}</div>
      )}
      <form className={styles.form} onSubmit={loginUser}>
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
        <div className={styles["links"]}>
          <div className={styles["styles-wrapper"]}>
            <button className={styles.button} type="submit">
              Войти
            </button>
          </div>
        </div>

        <div className={styles["links"]}>
          <div> Нет аккаунта?</div>
          <div>
            <Link to="/auth/register">Зарегистрироваться</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
