import { useSelector } from 'react-redux';
import { getCartSelector } from '../../redux/slices/cartSlice';

export function CartResult({ data }) {
  const state = useSelector(getCartSelector);
  const sum = state.reduce((res, el) => {
    const { price } = data.find(({ _id: id }) => id === el.id);
    return res + price * el.count * el.isChecked;
  }, 0);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Итог</h5>
        <p className="card-text">
          {sum}
          {' '}
          руб.
        </p>
        <button
          onClick={() => {}}
          type="button"
          className="btn btn-primary"
        >
          Оформить
        </button>
      </div>
    </div>
  );
}
