import { createContext, useState } from "react";
import "./App.css";
import Library from "./pages/library";
import Layout from "./comp/layout/layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { ProtectedRoute } from "./comp/auth";

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "dark");
    return "dark";
  }
  return theme;
};
export const ThemeContext = createContext("light");
function App() {
  const [theme, setTheme] = useState(getTheme());
  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
      return;
    }
    setTheme("dark");
  }
  document.body.style.backgroundColor = theme === "dark" ? "" : "white";
  return (
    <ThemeContext.Provider value={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout themeToggle={toggleTheme} />}>
          <Route
            path="library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="marketplace"
            element={
              <ProtectedRoute>
                <h1>Marketplace</h1>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
