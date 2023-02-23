import * as Yup from 'yup';

export const newProductFormValidationSchema = Yup.object({
  name: Yup.string()
    .required('Не должно быть пустым'),
  price: Yup.number()
    .required('Не должно быть пустым'),
  discount: Yup.number(),
  stock: Yup.number(),
  wight: Yup.string(),
  pictures: Yup.string(),
  description: Yup.string()
    .required('Не должно быть пустым'),
  available: Yup.boolean(),
});
