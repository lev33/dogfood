import { useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../redux/slices/cartSlice';
import { Modal } from '../Modal/Modal';

export function DeleteItemModal({
  closeHandler, isOpen, name, id,
}) {
  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    dispatch(removeProductFromCart(id));
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Вы действительно хотите удалить товар:
        <b>{name}</b>
      </h4>
      <div className="d-flex justify-content-center">
        <button
          onClick={removeFromCartHandler}
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
