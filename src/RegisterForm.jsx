import { useState } from "react";
import "./RegisterForm.css";
import logo from "./assets/logo.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function RegisterForm() {
  const [role, setRole] = useState("creator");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, role });
  };

  return (
    <div className="layout">
      <div className="left-side">
        <img src={logo} alt="Pinky" className="logo" />
        <h1>Открой Для Себя Мир AI-Моделей</h1>
        <p>
          Присоединяйся к Pinky и получи доступ к уникальным AI-моделям,
          созданным талантливыми креаторами со всего мира.
        </p>
      </div>

      <div className="right-side">
        <div className="form-container">
          <div className="form-card">
            <h2>Создать аккаунт</h2>
            <form onSubmit={handleSubmit}>
              <label>Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder=""
              />

              <label>Email-адрес</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=""
              />

              <label>Пароль</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder=""
              />

              <label>Ваша роль на платформе</label>
              <div className="role-buttons">
                <button
                  type="button"
                  onClick={() => setRole("creator")}
                  className={role === "creator" ? "active" : ""}
                >
                  AI Креатор
                </button>
                <button
                  type="button"
                  onClick={() => setRole("subscriber")}
                  className={role === "subscriber" ? "active" : ""}
                >
                  Подписчик
                </button>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span>Я подтверждаю согласие с условиями сервиса</span>
              </div>

              <button type="submit" className="submit-btn">
                Создать аккаунт
              </button>

              <div className="footer">
                Уже есть аккаунт? <a href="#">Войти</a>
              </div>

              <div className="social">
                <p>или войти через</p>
                <div className="social-buttons">
                  <button type="button" className="social-btn google">
                    <FcGoogle size={20} />
                    <span>Google</span>
                  </button>

                  <button type="button" className="social-btn apple">
                    <FaApple size={20} />
                    <span>Apple</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
