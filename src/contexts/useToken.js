import { useCallback, useEffect, useState } from 'react';
import { dogFoodApi } from '../api/DogFoodApi';

const DOG_FOOD_LS_KEY = 'DOG_FOOD_LS_KEY';

export const useToken = () => {
  const [token, setToken] = useState(() => {
    const tokenFromLS = JSON.parse(localStorage.getItem(DOG_FOOD_LS_KEY)) || '';
    return tokenFromLS;
  });

  useEffect(() => {
    localStorage.setItem(DOG_FOOD_LS_KEY, JSON.stringify(token));
    dogFoodApi.setToken(token);
  }, [token]);

  const addToken = useCallback(
    (newToken) => {
      setToken(newToken);
    },
    [setToken],
  );

  const clearLS = useCallback(() => {
    setToken('');
  }, [setToken]);

  return {
    token,
    clearLS,
    addToken,
  };
};
