/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../redux/slices/userSlice';
import { DeleteReviewModal } from './DeleteReviewModal';

export function ReviewItem({
  id, review,
}) {
  const user = useSelector(getUserSelector);

  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt);

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const closeDeleteModalHandler = () => {
    setIsShowDeleteModal(false);
  };

  const openDeleteModalHandler = () => {
    setIsShowDeleteModal(true);
  };

  console.log({ user, id, review });

  return (
    <>
      <li>
        <div>
          <div>
            Автор
            {' '}
            <b>{review.author.name}</b>
            ,
            {' '}
            {formattedUpdatedAt}
          </div>
          <div>
            Оценка
            {' '}
            <b>{review.rating}</b>
          </div>
        </div>
        <div>{review.text}</div>
        {review.author._id === user.id && (
        <button
          onClick={openDeleteModalHandler}
          type="button"
          className="btn btn-danger"
        >
          Удалить
        </button>
        )}
      </li>
      <DeleteReviewModal
        closeHandler={closeDeleteModalHandler}
        isOpen={isShowDeleteModal}
        id={id}
      />

    </>
  );
}
