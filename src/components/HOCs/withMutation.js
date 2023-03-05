/* eslint-disable linebreak-style */
import { Loader } from '../Loader/Loader';

// eslint-disable-next-line func-names
export const withMutation = (WrappedComponent) => function ({
  isLoading, isError, error, ...rest
}) {
  if (isError) {
    return (
      <div className="d-flex flex-column justify-content-center">

        <p>
          Error happend:
          {' '}
          {error.message}
        </p>

      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <WrappedComponent {...rest} />
  );
};
