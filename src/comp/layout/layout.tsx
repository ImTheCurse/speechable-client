import { useContext } from "react";
import { ThemeContext } from "../../App";
import AvatarItem from "./avatar";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

export default function Layout(prop: { themeToggle: Function }) {
  const theme = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-white" : "text-black";

  const lightModeIconStyle = {
    color: "black",
    marginRight: "1.5rem",
  };

  const darkModeIconStyle = {
    color: "white",
    marginRight: "1.5rem",
  };

  const themeIcon =
    theme === "dark" ? (
      <IconButton
        onClick={prop.themeToggle}
        aria-label="global-theme"
        sx={darkModeIconStyle}
      >
        <DarkModeOutlinedIcon />
      </IconButton>
    ) : (
      <IconButton
        onClick={prop.themeToggle}
        aria-label="theme"
        sx={lightModeIconStyle}
      >
        <WbSunnyOutlinedIcon />
      </IconButton>
    );

  const searchIcon =
    theme === "dark" ? (
      <IconButton sx={darkModeIconStyle}>
        <SearchOutlined />
      </IconButton>
    ) : (
      <IconButton sx={lightModeIconStyle}>
        <SearchOutlined />
      </IconButton>
    );

  return (
    <>
      <div className="flex fixed top-0 left-0 w-full items-center justify-between">
        <ul className="flex flex-row items-center">
          <li>
            <a href="/">
              <img
                src={
                  theme === "dark"
                    ? "src/assets/speechable_transp-white.svg "
                    : "src/assets/speechable_transp.svg "
                }
                alt="logo"
                className="logo h-16 mb-6 fill-white "
              />
            </a>
          </li>
          <li className="ml-24">
            <a href="/library" className={"text-xl font-semibold " + textColor}>
              Library
            </a>
          </li>
          <li className="ml-8">
            <a
              href="/marketplace"
              className={" text-xl font-semibold " + textColor}
            >
              Marketplace
            </a>
          </li>
        </ul>
        <div className="flex justify-end items-center">
          {searchIcon}
          {themeIcon}
          <AvatarItem />
        </div>
      </div>
      <Outlet />
    </>
  );
}
