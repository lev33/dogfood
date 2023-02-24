/* eslint-disable no-template-curly-in-string */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { addProductToFavourites } from '../../redux/slices/favouritesSlice';

export function ProductItem({
  id, name, pictures, description,
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
          {description}
        </p>
        <button
          onClick={addToCartHandler}
          type="button"
          className="btn btn-success"
        >
          Добавить в корзину
        </button>
        <button
          onClick={addToFavouritesHandler}
          type="button"
          className="btn btn-success"
        >
          Добавить в избранное
        </button>
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
