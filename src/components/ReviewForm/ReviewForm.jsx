import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getUserSelector } from '../../redux/slices/userSlice';
import { Loader } from '../Loader/Loader';
import { newProductReviewValidationSchema } from './validator';

const initialValues = {
  text: '',
  rating: '',
};

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

export function ReviewForm({ id }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const { token } = useSelector(getUserSelector);
  const queryClient = useQueryClient();

  function openReviewFormHandler() {
    setIsReviewFormOpen(true);
  }

  function closeReviewFormHandler() {
    setIsReviewFormOpen(false);
  }

  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addReview(values, id, token),
  });

  const submitHandler = async (values) => {
    await mutateAsync(values);
    setIsReviewFormOpen(false);
    queryClient.invalidateQueries({
      queryKey: ['ReviewsFetch'],
    });
  };

  return (
    <>
      {!isReviewFormOpen && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={openReviewFormHandler}
        >
          Добавить отзыв на товар
        </button>
      )}
      {isReviewFormOpen && (
        <Formik
          initialValues={initialValues}
          validationSchema={newProductReviewValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className="d-grid gap-2 col-6 mx-auto">
            <MyTextInput
              label="Отзыв"
              name="text"
              type="text"
              placeholder="отзыв"
            />
            <MyTextInput
              label="Рейтинг"
              name="rating"
              type="text"
              placeholder="рейтинг от 1 до 5"
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={closeReviewFormHandler}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Опубликовать отзыв
            </button>
          </Form>
        </Formik>
      )}
      {isLoading && (<div><Loader /></div>)}
      {isError && (<div>{error.message}</div>)}
    </>
  );
}
