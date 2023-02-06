import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart, getCartSelector, removeItemFromCart, setProductCount, removeProductFromCart,
} from '../../redux/slices/cartSlice';

export function CartItem({
  id, name, pictures, price, stock,
}) {
  const dispatch = useDispatch();

  const state = useSelector(getCartSelector);
  const { count } = state.find((el) => el.id === id);
  if (count > stock) {
    dispatch(setProductCount({ id, count: stock }));
  }

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(id));
  };

  const removeItemFromCartHandler = () => {
    dispatch(removeItemFromCart(id));
  };

  const removeFromCartHandler = () => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={pictures} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          Цена
          {' '}
          {price}
        </p>
        <p className="card-text">
          В наличии
          {' '}
          {stock}
        </p>
        <p className="card-text">
          В корзине
          {' '}
          {count}
        </p>
        <button
          onClick={removeItemFromCartHandler}
          type="button"
          className="btn btn-light"
          disabled={count <= 1}
        >
          -
        </button>
        <span className="card-text">
          {' '}
          {count}
          {' '}
        </span>
        <button
          onClick={addItemToCartHandler}
          type="button"
          className="btn btn-light"
          disabled={count >= stock}
        >
          +
        </button>
        <span>{' '}</span>
        <button
          onClick={removeFromCartHandler}
          type="button"
          className="btn btn-danger"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
