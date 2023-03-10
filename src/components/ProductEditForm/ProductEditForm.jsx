/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useSelector } from 'react-redux';
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

function MyCheckbox({ children, ...props }) {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}

export function ProductEditForm({ closeHandler, product }) {
  const { token } = useSelector(getUserSelector);
  const queryClient = useQueryClient();

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
    closeHandler();
    queryClient.invalidateQueries({
      queryKey: ['ProductFetch'],
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newProductFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className="d-grid gap-2 col-6 mx-auto">
        <MyTextInput
          label="????????????????????????"
          name="name"
          type="text"
          placeholder="????????????????????????"
        />
        <MyTextInput
          label="????????"
          name="price"
          type="text"
          placeholder="????????"
        />
        <MyTextInput
          label="????????????"
          name="discount"
          type="text"
          placeholder="????????????"
        />
        <MyTextInput
          label="?? ??????????????"
          name="stock"
          type="text"
          placeholder="?? ??????????????"
        />
        <MyTextInput
          label="??????"
          name="wight"
          type="text"
          placeholder="??????"
        />
        <MyTextInput
          label="??????????????????????"
          name="pictures"
          type="text"
          placeholder="??????????????????????"
        />
        <MyTextInput
          label="????????????????"
          name="description"
          type="text"
          placeholder="????????????????"
        />
        <MyCheckbox name="available">
          {' '}
          ?????????? ????????????????
        </MyCheckbox>
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary"
        >
          ??????????????????
        </button>
      </Form>
    </Formik>
  );
}
