import styles from "./Layout.module.css";
import { NavLink, Outlet } from "react-router-dom";
import cn from "classnames";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispath, RootState } from "../../store/store";
import { getProfile, logOut } from "../../store/user.slice";

function Layout() {
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (jwt) {
      dispatch(getProfile());
    }
  }, [dispatch, jwt]);

  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.count, 0),
    [items],
  );

  return (
    <main className={styles["main-layout"]}>
      <div className={styles["main-layout__left"]}>
        <div className={styles["main-layout__user"]}>
          <img
            className={styles["main-layout__avatar"]}
            src="./avatar.png"
            alt="User avatar"
          />
        </div>
        {profile ? (
          <div className={styles["main-layout__user-info"]}>
            <div>{profile.name} </div>
            <a
              className={styles["main-layout__user-email"]}
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </div>
        ) : (
          <div className={styles["main-layout__user-info"]}>Guest</div>
        )}

        <nav className={styles["main-layout__navigation"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["main-layout__navigation-link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src="./menu.png" alt="menu-icon" />
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["main-layout__navigation-link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src="./menu2.png" alt="cart-icon" />
            Cart
            <span className={styles["main-layout__cart"]}>{cartCount}</span>
          </NavLink>

          {profile ? (
            <button
              className={styles["main-layout__logout"]}
              type="button"
              onClick={() => dispatch(logOut())}
            >
              Выйти
            </button>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className={styles["main-layout__navigation-link"]}
              >
                <img
                  className={styles["main-layout__icon"]}
                  src="./login.jpg"
                  alt="login-icon"
                />
                Войти
              </NavLink>
              <NavLink
                to="/auth/register"
                className={styles["main-layout__navigation-link"]}
              >
                <img
                  className={styles["main-layout__icon"]}
                  src="./login.jpg"
                  alt="register-icon"
                />
                Зарегистрироваться
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <div className={styles["main-layout__right"]}>
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
