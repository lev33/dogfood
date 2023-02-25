/* eslint-disable no-underscore-dangle */
import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getUserSelector } from '../../redux/slices/userSlice';
import { newProductFormValidationSchema } from './validator';

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export function ProductEditForm({ product }) {
  const navigate = useNavigate();
  const { token } = useSelector(getUserSelector);

  const initialValues = {
    name: product.name,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    wight: product.wight,
    pictures: product.pictures,
    description: product.description,
    available: product.available,
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => dogFoodApi.editProductById(data, product._id, token),
  });

  const submitHandler = async (values) => {
    await mutateAsync(values);
    navigate('/products');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newProductFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className="d-grid gap-2 col-6 mx-auto">
        <MyTextInput
          label="Наименование"
          name="name"
          type="text"
          placeholder="наименование"
        />
        <MyTextInput
          label="Цена"
          name="price"
          type="text"
          placeholder="цена"
        />
        <MyTextInput
          label="Скидка"
          name="discount"
          type="text"
          placeholder="скидка"
        />
        <MyTextInput
          label="В наличии"
          name="stock"
          type="text"
          placeholder="в наличии"
        />
        <MyTextInput
          label="Вес"
          name="wight"
          type="text"
          placeholder="вес"
        />
        <MyTextInput
          label="Изображение"
          name="pictures"
          type="text"
          placeholder="изображение"
        />
        <MyTextInput
          label="Описание"
          name="description"
          type="text"
          placeholder="описание"
        />
        <MyTextInput
          label="Доступен"
          name="available"
          type="text"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary"
        >
          Отправить
        </button>
      </Form>
    </Formik>
  );
}
