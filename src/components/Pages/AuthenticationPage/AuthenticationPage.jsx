import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { useTokenContext, useTokenMethodsContext } from '../../../contexts/TokenContextProvider';
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
  const token = useTokenContext();
  const { addToken } = useTokenMethodsContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Authentication', { token });
    if (token) navigate('/products');
  }, [token]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => dogFoodApi.signIn(data),
  });

  const submitHandler = async (values) => {
    const res = await mutateAsync(values);
    addToken(res.token);
    dogFoodApi.setToken(res.token);
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
          label="Email Address"
          name="email"
          type="email"
          placeholder="email here"
        />
        <MyTextInput
          label="Password"
          name="password"
          type="text"
          placeholder="password here"
        />
        <button disabled={isLoading} type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
  );
}
