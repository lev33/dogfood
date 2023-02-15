import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { changeSearchFilter } from '../../redux/slices/filterSlice';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q');

    return searchValueFromQuery ?? '';
  });
  const dispatch = useDispatch();

  const debouncedSearchValue = useDebounce(search, 550);

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value;
    console.log(newSearchValue);
    setSearch(newSearchValue);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    });
  };

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <input
      placeholder="Поиск..."
      type="text"
      className="form-control"
      style={{ width: '500px', margin: '24px auto' }}
      value={search}
      onChange={changeSearchHandler}
    />
  );
}
