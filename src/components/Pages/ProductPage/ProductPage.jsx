/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import { addProductToFavourites } from '../../../redux/slices/favouritesSlice';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import { ReviewItem } from '../../ReviewItem/ReviewItem';

function ProductInner({ data }) {
  console.log({ data });
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const {
    _id: id, name, pictures, price, stock, reviews, author,
  } = data;

  const addToCartHandler = () => {
    dispatch(addItemToCart(id));
  };

  const addToFavouritesHandler = () => {
    dispatch(addProductToFavourites(id));
  };

  return (
    <>
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
          { author._id === user.id && (
          <>
            <button
              onClick={() => { }}
              type="button"
              className="btn btn-primary"
            >
              Редактировать
            </button>
            <span>{' '}</span>
            <button
              onClick={() => { }}
              type="button"
              className="btn btn-danger"
            >
              Удалить
            </button>
          </>
          )}
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
        </div>
      </div>
      <div>Добавить форму отзыва</div>
      <div>
        <ul
          className="d-flex flex-column p-2"
        >
          {reviews && reviews.map(({
            _id: rewiewId, text, rating,
          }) => (
            <ReviewItem
              key={rewiewId}
              price={rating}
              stock={text}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

const ProductInnerWithQuery = withQuery(ProductInner);

export function ProductPage() {
  const navigate = useNavigate();
  const { token } = useSelector(getUserSelector);
  const { id } = useParams();

  useEffect(() => {
    console.log('ProductPage', { token });
    if (!token) navigate('/signin');
  }, [token]);

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['ProductFetch'],
    queryFn: () => dogFoodApi.getProductById(id, token),
  });

  return (token
  && (
    <ProductInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
  );
}
