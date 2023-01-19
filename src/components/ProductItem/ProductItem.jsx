export function ProductItem({ name, pictures, description }) {
  return (
    <>
      <div>
        {name}
      </div>
      <div>
        <img src={pictures} alt="pict" />
      </div>
      <div>
        {description}
      </div>
      <hr />
    </>
  );
}
