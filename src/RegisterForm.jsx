import { useState } from "react";
import "./RegisterForm.css"; 

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
              <button type="button">Google</button>
              <button type="button">GitHub</button>
              <button type="button">Twitter</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
