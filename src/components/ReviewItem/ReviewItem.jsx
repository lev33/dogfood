export function ReviewItem({
  review,
}) {
  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedUpdatedAt = updatedAt.toLocaleString(updatedAt);
  return (
    <li>
      <div>
        <div>
          Автор
          {' '}
          <b>{review.author}</b>
          ,
          {' '}
          {formattedUpdatedAt}
        </div>
        <div>
          Оценка
          {' '}
          <b>{review.rating}</b>
        </div>
      </div>
      {review.text}
    </li>
  );
}
