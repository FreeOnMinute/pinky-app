import React from "react";
import "./FavoriteCard.css";

export default function FavoriteCard({ title, image, url }) {
  return (
    <div className="favorite-card">
      <div className="favorite-image">
        <img src={url || image} />
      </div>
      <div className="favorite-info">
        <h3>{title}</h3>
        <div className="favorite-actions">
          <button className="message-button">Написать</button>
          <button className="profile-button">Профиль</button>
        </div>
      </div>
    </div>
  );
}
