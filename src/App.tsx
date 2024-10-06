import { createContext, useState } from "react";
import "./App.css";
import Library from "./pages/library";
import Layout from "./comp/layout/layout";
import { Route, Routes } from "react-router-dom";

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
        <Route path="/" element={<Layout themeToggle={toggleTheme} />}>
          <Route path="library" element={<Library />} />
          <Route path="marketplace" element={<h1>Marketplace</h1>} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
