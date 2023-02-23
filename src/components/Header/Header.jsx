import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getCartSelector } from '../../redux/slices/cartSlice';
import { clearLS, getUserSelector } from '../../redux/slices/userSlice';
import headerStyles from './header.module.css';

export function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector(getUserSelector);
  const count = useSelector(getCartSelector).length;

  console.log('Header', { token });

  const clickLogOutHandler = () => {
    dispatch(clearLS());
  };

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
              Продукты
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/favourites"
            >
              Избранное
            </NavLink>
          </li>
          <li>
            { token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/cart"
            >
              {`Корзина ${count}`}
            </NavLink>
            )}
          </li>
          <li>
            { token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/user"
            >
              Профиль
            </NavLink>
            )}
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
              onClick={clickLogOutHandler}
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
