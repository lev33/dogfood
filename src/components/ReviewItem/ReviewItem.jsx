export function ReviewItem({
  price, stock,
}) {
  return (
    <div className="card" style={{ width: '18rem' }}>

      <div className="card-body">
        <p className="card-text">
          Рейтинг:
          {' '}
          {price}
        </p>
        <p className="card-text">
          Отзыв:
          {' '}
          {stock}
        </p>

      </div>
    </div>
  );
}
