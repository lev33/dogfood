// import { useDispatch } from 'react-redux';
// import { removeProductFromCart } from '../../redux/slices/cartSlice';
import { Modal } from '../../Modal/Modal';
import { NewProductForm } from './NewProductForm';

export function AddProductModal({
  closeHandler, isOpen, name,
}) {
  // const dispatch = useDispatch();

  const addProductHandler = () => {
    // dispatch(removeProductFromCart(id));
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Добавление товара от
        <b>
          {' '}
          {name}
        </b>
      </h4>
      <NewProductForm />
      <div className="d-flex justify-content-center">
        <button
          onClick={addProductHandler}
          type="button"
          className="btn mx-2 btn-primary"
        >
          Добавить
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
