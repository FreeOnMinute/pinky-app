import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./assets/logo.jpg";
import FavoriteCard from "./FavoriteCard";
import "./Favorites.css";
import { FiSettings } from "react-icons/fi";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState("Избранное");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (fetching) {
      console.log("Загрузка страницы:", currentPage);

      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=6&_page=${currentPage}`,
        )
        .then((response) => {
          setFavorites([...favorites, ...response.data]);
          setCurrentPage((prevPage) => prevPage + 1);
          setTotalCount(response.headers["x-total-count"]);
        })
        .catch((error) => {
          console.error("Ошибка загрузки:", error);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [favorites.length, totalCount]);

  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 200 &&
      favorites.length < totalCount &&
      !fetching
    ) {
      console.log("Загружаем ещё...");
      setFetching(true);
    }
  };

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
    switch (item) {
      case "Главная":
        navigate("/");
        break;
      case "Топ Моделей":
        navigate("/my-models");
        break;
      case "Избранное":
        navigate("/favorites");
        break;
      case "Мой Профиль":
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-layout">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="Pinky" className="brand-logo" />
        </div>

        <nav>
          <ul>
            <li
              className={activeMenuItem === "Главная" ? "active" : ""}
              onClick={() => handleMenuItemClick("Главная")}
            >
              Главная
            </li>
            <li
              className={activeMenuItem === "Топ Моделей" ? "active" : ""}
              onClick={() => handleMenuItemClick("Топ Моделей")}
            >
              Топ Моделей
            </li>
            <li
              className={activeMenuItem === "Избранное" ? "active" : ""}
              onClick={() => handleMenuItemClick("Избранное")}
            >
              Избранное
            </li>
            <li
              className={activeMenuItem === "Мой Профиль" ? "active" : ""}
              onClick={() => handleMenuItemClick("Мой Профиль")}
            >
              Мой Профиль
            </li>
          </ul>
        </nav>
        <div className="settings-icon">
          <FiSettings className="settings-svg" />
        </div>
      </aside>

      <main className="feed">
        <div className="feed-header">
          <h1>Избранное</h1>
          <Link to="/register" className="register-button">
            Регистрация
          </Link>
        </div>

        <div className="favorites-grid">
          {favorites.map((item) => (
            <FavoriteCard key={item.id} title={item.title} image={item.url} />
          ))}
        </div>

        {fetching && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Загрузка избранного...</p>
          </div>
        )}

        {favorites.length >= totalCount && favorites.length > 0 && (
          <div className="end-message">
            <p>Вы просмотрели все избранное</p>
          </div>
        )}
      </main>
    </div>
  );
}
