import classNames from 'classnames';
import {
  AiOutlineFileAdd, AiOutlineHeart, AiOutlineHome, AiOutlineInfoCircle, AiOutlineShoppingCart,
} from 'react-icons/ai';
import { RxExit } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getCartSelector } from '../../redux/slices/cartSlice';
import { getFavouritesSelector } from '../../redux/slices/favouritesSlice';
import { clearLS, getUserSelector } from '../../redux/slices/userSlice';
import headerStyles from './header.module.css';

export function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector(getUserSelector);
  const cartCount = useSelector(getCartSelector).length;
  const favouritesCount = useSelector(getFavouritesSelector).length;

  console.log('Header', { token });

  const clickLogOutHandler = () => {
    dispatch(clearLS());
  };

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.headerMenu}>
          <li>
            <Link to="/">
              <AiOutlineHome size={24} />
            </Link>
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
            { token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/favourites"
            >
              <AiOutlineHeart size={24} />
              {favouritesCount || null}
            </NavLink>
            )}
          </li>
          <li>
            { token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/cart"
            >
              <AiOutlineShoppingCart size={24} />
              {cartCount || null}
            </NavLink>
            )}
          </li>
          <li>
            { token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/user"
            >
              <AiOutlineInfoCircle size={24} />
            </NavLink>
            )}
          </li>
          <li>
            { token && (
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/add"
            >
              <AiOutlineFileAdd size={24} />
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
              <RxExit />
            </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
