import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarProps } from "../utils/component";

const Navbar: FC<NavbarProps> = ({ search, icon }) => {
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [theme, setTheme] = useState<string | any>(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const iconNotif = useRef<HTMLImageElement>(null);
  const notifRef = useRef<HTMLImageElement>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const menuRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowDropdown(false);
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target !== notifRef.current && e.target !== iconNotif.current) {
      setShowNotif(false);
    }
  });

  return (
    <div>
      <div className="flex justify-around items-center h-16 w-full font-main text-white bg-slate-500">
        <h1 className="text-2xl font-bold font-logo">
          <i className="bx bxs-camera-movie"></i> MOOPI
        </h1>
        <div>
          <ul className="flex gap-12">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorite" className="hover:text-yellow-300">
                Favorite
              </Link>
            </li>
            <li>
              <Link to="/popular" className="hover:text-yellow-300">
                Popular
              </Link>
            </li>
            <li className="border-l border-solid border-l-slate-300"></li>
            <li>
              <button onClick={search}>{icon ? <i className="bx bx-x hover:text-yellow-300"></i> : <i className="bx bx-search hover:text-yellow-300"></i>}</button>
            </li>
          </ul>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={handleThemeSwitch}>{theme == "dark" ? <i className="bx bxs-moon hover:text-yellow-300"></i> : <i className="bx bxs-sun hover:text-yellow-300"></i>}</button>
          <i ref={iconNotif} onClick={() => setShowNotif(!showNotif)} className="bx bxs-bell hover:text-yellow-300 cursor-pointer"></i>
          {showNotif ? (
            <div ref={notifRef} className="w-52 h-28 z-50 bg-white rounded-md absolute right-[100px] top-14 p-4">
              <h1 className="text-md font-bold text-black">
                Unread Notifications: <span className="text-slate-700">0</span>
              </h1>
            </div>
          ) : (
            <></>
          )}

          <div className="rounded-full w-10 h-10">
            <img ref={imgRef} onClick={() => setShowDropdown(!showDropdown)} src="https://source.unsplash.com/random?avatar" className="object-cover rounded-[inherit] w-full h-full cursor-pointer" alt="profile" />
          </div>
          {showDropdown ? (
            <div ref={menuRef} className="w-52 h-28 z-50 bg-white rounded-md absolute right-[45px] top-14 p-4">
              <ul className="text-black text-center">
                <li onClick={() => setShowDropdown(!showDropdown)} className="p-3 hover:bg-gray-300 cursor-pointer">
                  <a href="#">Profil</a>
                </li>
                <li onClick={() => setShowDropdown(!showDropdown)} className="p-3 hover:bg-red-600 hover:text-white cursor-pointer">
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
