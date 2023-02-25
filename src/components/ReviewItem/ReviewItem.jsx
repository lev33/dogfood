export function ReviewItem({
  review,
}) {
  const createdAt = new Date(Date.parse(review.created_at));
  const updatedAt = new Date(Date.parse(review.updated_at));
  const formattedCreatedAt = createdAt.toLocaleString(createdAt);
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
          {formattedCreatedAt}
          {(formattedCreatedAt !== formattedUpdatedAt) && (
            <div>
              Обновлено
              {' '}
              {formattedUpdatedAt}
            </div>
          )}
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
