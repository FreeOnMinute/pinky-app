export default function Post({ title, description, likes, date, image }) {
  return (
    <div className="post">
      <h3>{title}</h3>

      {image && (
        <div className="post-image">
          <img src={image} />
        </div>
      )}

      {description && <p>{description}</p>}
    </div>
  );
}
