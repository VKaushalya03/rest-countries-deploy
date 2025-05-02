import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import CountryDetailPage from "./pages/country-detail";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FavoritesPage from "./pages/favorites";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries/:code" element={<CountryDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
