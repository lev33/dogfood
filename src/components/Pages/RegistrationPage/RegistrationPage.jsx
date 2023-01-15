import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { registrationFormValidationSchema } from './validator';

const initialValues = {
  email: '',
  group: 'sm9',
  password: '',
};

export function RegistrationPage() {
  const submitHandler = (values) => {
    console.log({ values });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form className="d-flex flex-column">
        <Field name="email" placeholder="email here" type="email" />
        <ErrorMessage component="p" className="error" name="email" />

        <Field name="group" type="text" />
        <ErrorMessage component="p" className="error" name="group" />

        <Field name="password" placeholder="password here" type="text" />
        <ErrorMessage component="p" className="error" name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
