import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { changeSearchFilter } from '../../redux/slices/filterSlice';

export function Search() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const debouncedSearchValue = useDebounce(search, 550);

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value;
    console.log(newSearchValue);
    setSearch(newSearchValue);
  };

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <input
      placeholder="Поиск..."
      value={search}
      onChange={changeSearchHandler}
    />
  );
}
