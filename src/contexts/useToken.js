import { useCallback, useEffect, useState } from 'react';

const DOG_FOOD_LS_KEY = 'DOG_FOOD_LS_KEY';

export const useToken = () => {
  const [token, setToken] = useState(() => {
    const dataFromLS = localStorage.getItem(DOG_FOOD_LS_KEY);
    return dataFromLS ? JSON.parse(dataFromLS) : '';
  });

  useEffect(() => {
    localStorage.setItem(DOG_FOOD_LS_KEY, JSON.stringify(token));
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
