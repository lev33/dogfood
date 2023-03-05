import { NavLink } from 'react-router-dom';
import footerStyles from './footer.module.css';

export function Footer() {
  return (
    <footer className={footerStyles.wr}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <NavLink
            to="/"
          >
            DogFood
          </NavLink>
          <div>
            © Интернет-магазин DogFood.ru
          </div>
        </div>
        <div>
          <div>Мы на связи</div>
          <div>8 (999) 00-00-00</div>
          <a
            href="mailto:dogfood.ru@gmail.com"
          >
            dogfood.ru@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
