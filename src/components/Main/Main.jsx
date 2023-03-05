import dog from './dog.jpeg';

export function Main() {
  return (
    <div>
      <h1 className="d-flex justify-content-center">Добро пожаловать в наш магазин!</h1>
      <img src={dog} className="card-img-top" alt="..." />
    </div>
  );
}
