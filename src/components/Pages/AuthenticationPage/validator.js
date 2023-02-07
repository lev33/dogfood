import * as Yup from 'yup';

export const authenticationFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Невалидный email')
    .required('Не должно быть пустым'),
  password: Yup.string()
    .min(5, 'Не менее 5 символов')
    .max(20, 'Не более 20 символов')
    .required('Не должно быть пустым'),
});
