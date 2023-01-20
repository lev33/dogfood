import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useTokenContext } from '../../contexts/TokenContextProvider';
import headerStyles from './header.module.css';

export function Header() {
  const token = useTokenContext();

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
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/signin"
            >
              { token ? ' Выход' : 'Вход' }
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/signup"
            >
              Регистрация
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
