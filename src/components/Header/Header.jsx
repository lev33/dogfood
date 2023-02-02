import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { clearLS } from '../../redux/slices/userSlice';
import headerStyles from './header.module.css';

export function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  console.log('Header', { token });

  const clickLogOutHandler = () => {
    dispatch(clearLS());
    dogFoodApi.setToken('');
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
