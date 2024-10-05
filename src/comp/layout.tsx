import { useContext } from "react";
import { ThemeContext } from "../App";

export default function Layout() {
  const theme = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-white" : "text-black";
  return (
    <div className="fixed top-0 left-0 w-full ">
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
    </div>
  );
}
