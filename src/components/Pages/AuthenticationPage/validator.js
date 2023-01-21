import * as Yup from 'yup';

export const authenticationFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});
