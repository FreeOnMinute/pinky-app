import React from "react";
import "./FavoriteCard.css";

export default function FavoriteCard({ title, image, url }) {
  return (
    <div className="favorite-card">
      <div className="favorite-image">
        <img src={url || image} alt={title} />
      </div>
      <div className="favorite-info">
        <h3>{title}</h3>
        <div className="favorite-actions">
          <span className="heart-icon">❤️</span>
          <button className="message-button">Написать</button>
        </div>
      </div>
    </div>
  );
}
