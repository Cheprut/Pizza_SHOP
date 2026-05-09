import styles from "./Auth.module.css";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className={styles["auth-layout"]}>
      <div className={styles["auth-layout__left"]}>
        <img src="/Group.png" alt="group" />
      </div>
      <div className={styles["auth-layout__right"]}>
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
