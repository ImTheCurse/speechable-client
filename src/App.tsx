import { createContext, useState } from "react";
import "./App.css";
import Layout from "./comp/layout";

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
      <Layout />
    </ThemeContext.Provider>
  );
}

export default App;
