export function ProductItem({ name, pictures, description }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={pictures} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {description}
        </p>
        <a href="google.com" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}
