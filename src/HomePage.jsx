import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import Post from "./Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function HomePage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState("Главная");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (fetching) {
      console.log(currentPage);
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`,
        )
        .then((response) => {
          setPhotos([...photos, ...response.data]);
          setCurrentPage((PrevState) => PrevState + 1);
          setTotalCount(response.headers["x-total-count"]);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      photos.length <= totalCount
    ) {
      setFetching(true);
      console.log("fetching");
    }
  };

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
    switch (item) {
      case "Главная":
        navigate("/");
        break;
      case "Мои модели":
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
              className={activeMenuItem === "Мои модели" ? "active" : ""}
              onClick={() => handleMenuItemClick("Мои модели")}
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
          <h1>Лента</h1>
          <Link to="/register" className="register-button">
            Регистрация
          </Link>
        </div>
        {photos.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            /*description={post.description}*/
            image={post.url}
          />
        ))}
      </main>
    </div>
  );
}
