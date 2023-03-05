import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { withMutation } from '../../HOCs/withMutation';
import { addUser, getUserSelector } from '../../../redux/slices/userSlice';
import { authenticationFormValidationSchema } from './validator';

const initialValues = {
  email: '',
  password: '',
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

export function AuthenticationPageInner({ mutateAsync }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  useEffect(() => {
    console.log('Authentication', { user });
    if (user.token) navigate('/products');
  }, [user.token]);

  const submitHandler = async (values) => {
    const {
      data: {
        group, name, email, _id: id,
      }, token,
    } = await mutateAsync(values);
    dispatch(addUser({
      group, name, email, token, id,
    }));
    console.log({ values, token });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authenticationFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className="d-grid gap-2 col-6 mx-auto">
        <MyTextInput
          label="Email"
          name="email"
          type="email"
          placeholder="email"
        />
        <MyTextInput
          label="Пароль"
          name="password"
          type="password"
          placeholder="пароль"
        />
        <button type="submit" className="btn btn-primary">Войти</button>
      </Form>
    </Formik>
  );
}

const AuthenticationPageWithQuery = withMutation(AuthenticationPageInner);

export function AuthenticationPage() {
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (data) => dogFoodApi.signIn(data),
  });

  return (
    <AuthenticationPageWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
    />

  );
}
