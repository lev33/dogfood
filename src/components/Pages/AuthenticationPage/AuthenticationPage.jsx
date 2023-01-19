import { useMutation } from '@tanstack/react-query';
import { Formik, Form, useField } from 'formik';
import { useNavigate } from 'react-router-dom';
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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  });

  const submitHandler = async (values) => {
    const res = await mutateAsync(values);
    navigate('/products');
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
