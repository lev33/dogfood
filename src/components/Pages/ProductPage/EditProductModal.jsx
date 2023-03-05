import { Modal } from '../../Modal/Modal';
import { ProductEditForm } from '../../ProductEditForm/ProductEditForm';

export function EditProductModal({
  closeHandler, isOpen, data,
}) {
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h4 className="text-center mb-5">
        Редактирование товара
        <b>
          {' '}
          {data.name}
        </b>
      </h4>
      <ProductEditForm closeHandler={closeHandler} product={data} />
    </Modal>
  );
}
