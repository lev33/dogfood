import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { changeSortFilter, getSortSelector } from '../../redux/slices/filterSlice';
import styles from './Filters.module.css';

const FILTERS = ['price', 'discount', 'updated_at'];

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = useSelector(getSortSelector);
  const dispatch = useDispatch();

  const clickFilterHandler = (filterName) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    });
    dispatch(changeSortFilter(key === filterName ? '' : filterName));
  };

  return (
    <div className="d-flex gap-2 justify-content-center">
      {FILTERS.map((filterName) => (
        <FilterItem
          key={filterName}
          clickFilterHandler={clickFilterHandler}
          filterName={filterName}
        />
      ))}
    </div>
  );
}

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams();

  const currentFilterName = searchParams.get('filterName');

  const sortKey = useSelector(getSortSelector);

  return (
    <button
      type="button"
      className={filterName === currentFilterName && filterName === sortKey ? styles.active : ''}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  );
}
