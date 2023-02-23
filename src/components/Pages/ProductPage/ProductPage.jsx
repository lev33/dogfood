import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import { ReviewItem } from '../../ReviewItem/ReviewItem';

function ProductInner({ data }) {
  console.log({ data });
  const dispatch = useDispatch();
  const {
    _id: id, name, pictures, price, stock, reviews,
  } = data;

  const addToCartHandler = () => {
    dispatch(addItemToCart(id));
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

          <button
            onClick={() => { }}
            type="button"
            className="btn btn-light"
            disabled={false}
          >
            +
          </button>
          <span>{' '}</span>
          <button
            onClick={() => { }}
            type="button"
            className="btn btn-danger"
          >
            Удалить
          </button>
          <button
            onClick={addToCartHandler}
            type="button"
            className="btn btn-success"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
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
