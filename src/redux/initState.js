import { REDUX_LS_KEY } from './constants';

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    token: '',
  },
  cart: [],
  favourites: [],
  filter: {
    search: '',
    sort: '',
  },
};

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(REDUX_LS_KEY);

  return dataFromLS ? JSON.parse(dataFromLS) : initState;
};
