import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
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

export function AuthenticationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(getUserSelector);

  useEffect(() => {
    console.log('Authentication', { token });
    if (token) navigate('/products');
  }, [token]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => dogFoodApi.signIn(data),
  });

  const submitHandler = async (values) => {
    const res = await mutateAsync(values);
    dispatch(addUser({
      group: res.data.group, name: res.data.name, email: res.data.email, token: res.token,
    }));
    console.log({ values, res });
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
          type="text"
          placeholder="пароль"
        />
        <button disabled={isLoading} type="submit" className="btn btn-primary">Войти</button>
      </Form>
    </Formik>
  );
}
