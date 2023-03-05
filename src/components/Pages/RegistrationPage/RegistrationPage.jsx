import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
import { withMutation } from '../../HOCs/withMutation';
import { dogFoodApi } from '../../../api/DogFoodApi';
import { registrationFormValidationSchema } from './validator';

const initialValues = {
  email: '',
  group: 'sm9',
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

export function RegistrationPageInner({ mutateAsync }) {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    const res = await mutateAsync(values);
    navigate('/signin');
    console.log({ values, res });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationFormValidationSchema}
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
          label="Группа"
          name="group"
          type="text"
        />
        <MyTextInput
          label="Пароль"
          name="password"
          type="password"
          placeholder="пароль"
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Зарегистрироваться
        </button>
      </Form>
    </Formik>
  );
}

const RegistrationPageWithQuery = withMutation(RegistrationPageInner);

export function RegistrationPage() {
  const {
    mutateAsync, isError, error, isLoading,
  } = useMutation({
    mutationFn: (data) => dogFoodApi.signUp(data),
  });

  return (
    <RegistrationPageWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
    />
  );
}
