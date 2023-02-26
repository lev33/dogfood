/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import { addProductToFavourites } from '../../../redux/slices/favouritesSlice';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { withQuery } from '../../HOCs/withQuery';
import { ReviewForm } from '../../ReviewForm/ReviewForm';
import { ReviewItem } from '../../ReviewItem/ReviewItem';
import { DeleteProductModal } from './DeleteProductModal';
import { EditProductModal } from './EditProductModal';

function ProductInner({ data }) {
  console.log({ data });
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const {
    _id: id, name, pictures, description, price, wight, discount, stock, reviews, author,
  } = data;

  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const closeEditModalHandler = () => {
    setIsShowEditModal(false);
  };

  const openEditModalHandler = () => {
    setIsShowEditModal(true);
  };

  const closeDeleteModalHandler = () => {
    setIsShowDeleteModal(false);
  };

  const openDeleteModalHandler = () => {
    setIsShowDeleteModal(true);
  };

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
            Скидка:
            {' '}
            {discount}
          </p>
          <p className="card-text">
            В наличии
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
          { author._id === user.id && (
          <>
            <button
              onClick={openEditModalHandler}
              type="button"
              className="btn btn-primary"
            >
              Редактировать
            </button>
            <span>{' '}</span>
            <button
              onClick={openDeleteModalHandler}
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
        </div>
      </div>
      <ReviewForm id={id} />
      <div>
        <ul
          className="d-flex flex-column p-2"
        >
          {reviews && reviews.map(({
            _id: rewiewId, ...review
          }) => (
            <ReviewItem
              key={rewiewId}
              review={review}
            />
          ))}
        </ul>
      </div>
      <EditProductModal
        closeHandler={closeEditModalHandler}
        isOpen={isShowEditModal}
        data={data}
      />
      <DeleteProductModal
        closeHandler={closeDeleteModalHandler}
        isOpen={isShowDeleteModal}
        name={name}
        id={id}
      />
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
