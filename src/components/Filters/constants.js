const LOW_PRICE = 'LOW_PRICE';
const HIGH_PRICE = 'HIGH_PRICE';
const LOW_LIKES = 'LOW_LIKES';
const HIGH_LIKES = 'HIGH_LIKES';
const LOW_DATE = 'LOW_DATE';
const HIGH_DATE = 'HIGH_DATE';
const SALES = 'SALES';

export const PRICE_FILTER = {
  type: [LOW_PRICE, HIGH_PRICE],
  name: 'Цена',
};

export const LIKES_FILTER = {
  type: [LOW_LIKES, HIGH_LIKES],
  name: 'Лайки',
};

export const DATE_FILTER = {
  type: [LOW_DATE, HIGH_DATE],
  name: 'Новое',
};

export const SALES_FILTER = {
  type: SALES,
  name: 'Распродажа',
};

export const FILTER_QUERY_NAME = 'filterType';

export const getFilteredProducts = ([...products], filterType) => {
  switch (filterType) {
    case LOW_PRICE:
      return products.sort((a, b) => b.price - a.price);
    case HIGH_PRICE:
      return products.sort((a, b) => a.price - b.price);
    case LOW_LIKES:
      return products.sort((a, b) => b.likes.length - a.likes.length);
    case HIGH_LIKES:
      return products.sort((a, b) => a.likes.length - b.likes.length);
    case LOW_DATE:
      return products.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    case HIGH_DATE:
      return products.sort((a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at));
    case SALES:
      return products.filter((product) => !!product.discount);
    default:
      return products;
  }
};
