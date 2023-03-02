import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getUserSelector } from '../../redux/slices/userSlice';
import { Modal } from '../Modal/Modal';

export function DeleteReviewModal({
  closeHandler, isOpen, id,
}) {
  const queryClient = useQueryClient();
  const { token } = useSelector(getUserSelector);
  const { id: productId } = useParams();

  const { mutateAsync } = useMutation({
    mutationFn: () => dogFoodApi.deleteReviewById(productId, id, token),
  });

  const deleteProductHandler = async () => {
    await mutateAsync();
    queryClient.invalidateQueries({
      queryKey: ['ProductFetch'],
    });
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Вы действительно хотите удалить отзыв?
      </h4>
      <div className="d-flex justify-content-center">
        <button
          onClick={deleteProductHandler}
          type="button"
          className="btn mx-2 btn-danger"
        >
          Удалить
        </button>
        <button
          onClick={closeHandler}
          type="button"
          className="btn mx-2 btn-dark"
        >
          Отменить
        </button>
      </div>
    </Modal>
  );
}
