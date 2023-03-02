import * as Yup from 'yup';

export const newProductFormValidationSchema = Yup.object({
  name: Yup.string()
    .required('Не должно быть пустым'),
  price: Yup.number('Должно быть числом')
    .min(0.01, 'Не менее 0.01').required('Не должно быть пустым'),
  discount: Yup.number('Должно быть числом')
    .min(0, 'Не менее 0').required('Не должно быть пустым'),
  stock: Yup.number('Должно быть числом')
    .min(0, 'Не менее 0').integer('Должно быть целым числом').required('Не должно быть пустым'),
  wight: Yup.string()
    .required('Не должно быть пустым'),
  pictures: Yup.string()
    .url('Должно быть валидной ссылкой').required('Не должно быть пустым'),
  description: Yup.string()
    .required('Не должно быть пустым'),
  available: Yup.boolean(),
});
