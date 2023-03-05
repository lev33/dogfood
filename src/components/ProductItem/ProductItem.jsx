/* eslint-disable no-template-curly-in-string */
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { addProductToFavourites } from '../../redux/slices/favouritesSlice';

export function ProductItem({
  id, name, pictures, description, price, wight, discount, stock,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addItemToCart(id));
  };

  const addToFavouritesHandler = () => {
    dispatch(addProductToFavourites(id));
  };

  const productInfoHandler = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={pictures} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          Цена:
          {' '}
          {price}
        </p>
        <p className="card-text">
          Скидка:
          {' '}
          {discount}
        </p>
        <p className="card-text">
          В наличии:
          {' '}
          {stock}
        </p>
        <p className="card-text">
          Вес:
          {' '}
          {wight}
        </p>
        <p className="card-text">
          {description}
        </p>
        <button
          onClick={addToCartHandler}
          type="button"
          className="btn btn-success"
        >
          <AiOutlineShoppingCart size={24} />
        </button>
        <span>{' '}</span>
        <button
          onClick={addToFavouritesHandler}
          type="button"
          className="btn btn-success"
        >
          <AiOutlineHeart size={24} />
        </button>
        <span>{' '}</span>
        <button
          onClick={productInfoHandler}
          type="button"
          className="btn btn-primary"
        >
          О товаре
        </button>
      </div>
    </div>
  );
}
