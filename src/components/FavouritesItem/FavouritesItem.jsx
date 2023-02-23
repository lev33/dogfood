import { useState } from 'react';
import { DeleteItemModal } from './DeleteItemModal';

export function FavouritesItem({
  id, name, pictures, price, stock,
}) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const closeDeleteModalHandler = () => {
    setIsShowDeleteModal(false);
  };

  const openDeleteModalHandler = () => {
    setIsShowDeleteModal(true);
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
      <DeleteItemModal
        closeHandler={closeDeleteModalHandler}
        isOpen={isShowDeleteModal}
        name={name}
        id={id}
      />
    </>
  );
}
