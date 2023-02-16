import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';

export function ProductItem({
  id, name, pictures, description,
}) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemToCart(id));
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={pictures} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {description}
        </p>
        <button
          onClick={addToCartHandler}
          type="button"
          className="btn btn-success"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
