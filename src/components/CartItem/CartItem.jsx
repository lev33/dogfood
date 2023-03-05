/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart, getCartSelector,
  removeItemFromCart, setProductCount, toggleIsChecked,
} from '../../redux/slices/cartSlice';
import { DeleteItemModal } from './DeleteItemModal';

export function CartItem({
  id, name, pictures, description, price, wight, discount, stock,
}) {
  const dispatch = useDispatch();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const closeDeleteModalHandler = () => {
    setIsShowDeleteModal(false);
  };

  const openDeleteModalHandler = () => {
    setIsShowDeleteModal(true);
  };

  const state = useSelector(getCartSelector);

  const currentItem = state.find((el) => el.id === id);
  if (currentItem?.count > stock) {
    dispatch(setProductCount({ id, count: stock }));
  }

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(id));
  };

  const removeItemFromCartHandler = () => {
    dispatch(removeItemFromCart(id));
  };

  const toggleProductIsChecked = () => {
    dispatch(toggleIsChecked(id));
  };

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          onChange={toggleProductIsChecked}
          type="checkbox"
          value=""
          checked={currentItem?.isChecked}
          id={id}
        />
        <label className="form-check-label" htmlFor={id}>
          Выбрать
        </label>
      </div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={pictures} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-6">
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
              <p className="card-text">
                В корзине
                {' '}
                {currentItem?.count}
              </p>
              <button
                onClick={removeItemFromCartHandler}
                type="button"
                className="btn btn-light"
                disabled={currentItem?.count <= 1}
              >
                -
              </button>
              <span className="card-text">
                {' '}
                {currentItem?.count}
                {' '}
              </span>
              <button
                onClick={addItemToCartHandler}
                type="button"
                className="btn btn-light"
                disabled={currentItem?.count >= stock}
              >
                +
              </button>
              <span>{' '}</span>
              <button
                onClick={openDeleteModalHandler}
                type="button"
                className="btn btn-danger"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteItemModal
        closeHandler={closeDeleteModalHandler}
        isOpen={isShowDeleteModal}
        name={name}
        id={id}
      />
    </>
  );
}
