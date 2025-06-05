import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const {t} = useTranslation()
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!query || query.length < 3 || query.length > 20){
      toast.error(t('query error'))
      return
    }
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={t('search__placeholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
      >
        <FaSearch className="w-5 h-5" />
      </button>
    </div>
  );
}
