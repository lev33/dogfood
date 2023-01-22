import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useTokenContext, useTokenMethodsContext } from '../../contexts/TokenContextProvider';
import headerStyles from './header.module.css';

export function Header() {
  const token = useTokenContext();
  const { clearLS } = useTokenMethodsContext();

  console.log('Header', { token });

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.headerMenu}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/products"
            >
              Products
            </NavLink>
          </li>
          <li>
            { !token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/signin"
            >
              Вход
            </NavLink>
            )}
          </li>
          <li>
            { !token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/signup"
            >
              Регистрация
            </NavLink>
            )}
          </li>
          <li>
            { token && (
            <button
              onClick={clearLS}
              type="submit"
              className="btn btn-warning"
            >
              Выход
            </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
