// src/components/Post.jsx

export default function Post({ title, description, likes, date, image }) {
  return (
    <div className="post">
      <h3>{title}</h3>
      
      {true && (
        <div className="post-image">
          <img src={"https://picsum.photos/600/400" } alt={title} />
        </div>
      )}
      
      {description && <p>{description}</p>}
    </div>
  );
}