// src/components/HomePage.jsx
import "./HomePage.css";
import { Link } from 'react-router-dom';
import logo from './assets/logo.jpg';
import Post from './Post';
import axios from 'axios';
import { useEffect, useState } from "react";

export default function HomePage() {
  
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      console.log(currentPage)
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
      .then(response => {
        setPhotos([...photos, ...response.data])
        setCurrentPage(PrevState => PrevState + 1)
        setTotalCount(response.headers['x-total-count'])
      })
      .finally(() => setFetching(false));

  }}, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    };
  }, [])


  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 
    && photos.length <= totalCount) {
      setFetching(true) 
      console.log('fetching')
    }
  }


  return (
    <div className="home-layout">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="Pinky" className="brand-logo" />
        </div>

        <nav>
          <ul>
            <li className="active">Лента</li>
            <li>Мои модели</li>
            <li>Избранное</li>
            <li>Профиль</li>
          </ul>
        </nav>
      </aside>

      <main className="feed">
        <div className="feed-header">
          <h1>Лента моделей</h1>
          <Link to="/register" className="register-button">Регистрация</Link>
        </div>
        {photos.map(post => (
          <Post 
            key={post.id}
            title={post.title}
            /*description={post.description}*/
            /*image={post}*/
          />
        ))}
      </main>
    </div>
  );
}