import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-md transition hover:bg-[#F5F7FA] dark:hover:bg-[#17222B]"
    >
      {darkMode ? <FaSun color="#F7BF1E" size={24} /> : <FaMoon color="#F7BF1E" size={20}/>}
    </button>
  );
}

export default DarkModeToggle;
