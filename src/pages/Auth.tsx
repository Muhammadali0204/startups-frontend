import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LoadingScreen from "../components/minicomponents/LoadingScreen";
import { setLoggingData } from "../app/features/authSlice";
import { useLoginMutation } from "../app/service/authApi";
import toast from "react-hot-toast";

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const hash = window.location.hash.slice(14);
    if (!hash) return;

    const authData = JSON.parse(decodeURIComponent(atob(hash)));
    login(authData)
      .unwrap()
      .then((result) => {
        console.log(result);
        dispatch(setLoggingData({
          token: result.access_token,
          expiresAt: result.expiresAt ? result.expiresAt : null,
          user: result.user,
        }));
        toast.success(t("auth_success"));
        navigate('/')
      })
      .catch(() => {
          toast.error(t("auth_error"));
          navigate("/");
        }
      );
  }, []);

  return (
    <div className="dark:text-white text-black dark:bg-[#030712] bg-[#F8F8F8] min-h-screen">
      <header>
        <title>{t("authPage__title")}</title>
      </header>
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default Auth;
