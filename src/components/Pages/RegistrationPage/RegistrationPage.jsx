import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
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

export function RegistrationPage() {
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => dogFoodApi.signUp(data),
  });

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
          label="Email Address"
          name="email"
          type="email"
          placeholder="email here"
        />
        <MyTextInput
          label="Group"
          name="group"
          type="text"
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
