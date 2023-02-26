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
          {review.author}
          ,
          {' '}
          {formattedUpdatedAt}
        </div>
        <div>
          Оценка
          {' '}
          {review.rating}
        </div>
      </div>
      {review.text}
    </li>
  );
}
