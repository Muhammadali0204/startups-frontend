import config from "../../config";
import { useTranslation } from "react-i18next";


const TelegramLogin = () => {
  const {t} = useTranslation();

  const handleLogin = () => {
    window.location.href = `https://oauth.telegram.org/auth?bot_id=${config.botID}&origin=${config.apiBasePath+"/auth"}`;
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
    >
      {t("login__text")}
    </button>
  );
};

export default TelegramLogin;
