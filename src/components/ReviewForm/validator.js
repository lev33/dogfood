import * as Yup from 'yup';

export const newProductReviewValidationSchema = Yup.object({
  text: Yup.string()
    .required('Не должно быть пустым'),
  rating: Yup.number()
    .min(1, 'Не менее 1')
    .max(5, 'Не более 5')
    .required('Не должно быть пустым'),

});
