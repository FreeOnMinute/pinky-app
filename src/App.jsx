// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import RegistrationForm from './RegisterForm.jsx';
import MyModels from './MyModels.jsx';
import Favorites from './Favorites.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-models" element={<MyModels />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MyModels from './pages/MyModels';
// import Favorites from './pages/Favorites';
// import Profile from './pages/Profile';
// import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;*/