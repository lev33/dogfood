import { Modal } from '../../Modal/Modal';
import { ProductAddPage } from '../ProductAddPage/ProductAddPage';

export function AddProductModal({
  closeHandler, isOpen, name,
}) {
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Добавление товара от
        <b>
          {' '}
          {name}
        </b>
      </h4>
      <ProductAddPage />
    </Modal>
  );
}
