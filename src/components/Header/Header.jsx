import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useTokenMethodsContext } from '../../contexts/TokenContextProvider';
import headerStyles from './header.module.css';

export function Header() {
  const { clearLS } = useTokenMethodsContext();
  // const clickHandler = () => { clearLS(); };

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
              SignIn
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activeLink]: isActive })}
              to="/signup"
            >
              SignUp
            </NavLink>
          </li>
          <li>
            <button
              onClick={clearLS}
              type="submit"
              className="btn btn-warning"
            >
              LogOut
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
