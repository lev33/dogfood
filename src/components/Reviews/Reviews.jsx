/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getUserSelector } from '../../redux/slices/userSlice';
import { withQuery } from '../HOCs/withQuery';
import { ReviewItem } from '../ReviewItem/ReviewItem';

function ReviewsInner({ reviews }) {
  console.log({ reviews });

  return (
    !!reviews.length && (
    <ul className="d-flex flex-column p-2">
      {reviews.map(({ _id: id, ...review }) => (
        <ReviewItem
          key={id}
          id={id}
          review={review}
        />
      ))}
    </ul>
    )
  );
}

const ReviewsInnerWithQuery = withQuery(ReviewsInner);

export function Reviews({ id }) {
  const { token } = useSelector(getUserSelector);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: ['ReviewsFetch', id],
    queryFn: () => dogFoodApi.getReviewsByProductId(id, token),
  });

  return (
      <ReviewsInnerWithQuery
        reviews={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        refetch={refetch}
      />
  );
}
