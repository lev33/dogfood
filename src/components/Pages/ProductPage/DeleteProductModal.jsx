import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { getUserSelector } from '../../../redux/slices/userSlice';
import { Modal } from '../../Modal/Modal';

export function DeleteProductModal({
  closeHandler, isOpen, name, id,
}) {
  const navigate = useNavigate();
  const { token } = useSelector(getUserSelector);

  const { mutateAsync } = useMutation({
    mutationFn: () => dogFoodApi.deleteProductById(id, token),
  });

  const deleteProductHandler = async () => {
    await mutateAsync();
    setTimeout(navigate('/products'));
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Вы действительно хотите удалить товар:
        <b>{name}</b>
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
