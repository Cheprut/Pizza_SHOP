import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

// Этот компонент RequireAuth является защитным механизмом для маршрутов в приложении на основе React с использованием библиотеки react-router-dom.
// Он проверяет, авторизован ли пользователь (на основе наличия JWT-токена), и, если нет, перенаправляет его на страницу логина.

// Компонент принимает children:
// Это React-компоненты, которые будут отображаться, если пользователь авторизован (имеет JWT).
// Тип ReactNode указывает на любой допустимый JSX-элемент, который будет передан как дочерние компоненты.

function RequireAuth({ children }: { children: ReactNode }) {
  // const jwt = null;
  // const jwt = localStorage.getItem('jwt');
  const jwt = useSelector((s: RootState) => s.user.jwt);
  // console.log(jwt); // null

  if (!jwt) {
    // если у пользователя нет jwt токена
    // отправим его на страницу с авторизацией
    // replace - заменяет текущий путь
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default RequireAuth;
