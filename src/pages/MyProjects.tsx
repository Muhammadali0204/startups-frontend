import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import { classNames } from "../utils/functions";
import { NavigationItem } from "../interfaces/other";
import { useGetMyProjectsQuery } from "../app/service/projectApi";
import TelegramLogin from "../components/minicomponents/TelegramLogin";
import ProjectComponent from "../components/minicomponents/ShortProject";
import LoadingScreen from "../components/minicomponents/LoadingScreen";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { logout } from "../app/features/authSlice";
import toast from "react-hot-toast";

const MyProjects = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user)
  const { data, error, isLoading, isError } = useGetMyProjectsQuery();
  const dispatch = useDispatch()


  const navigation: NavigationItem[] = [
    { name: t('nav__home'), href: '/', current: false },
    { name: t('nav__projects'), href: '/my-projects', current: true },
  ]

  useEffect(() => {
    if (error) {
      const err = error as {
        status: number;
        data: { detail?: string; message?: string };
      };
      if (err.status === 401) {
        dispatch(logout());
      }
      else{
        toast.error(
          t('error__fetching data')
        )
      }
    }
  }, [error, isError])

  return (
    <div className="text-black dark:text-white bg-[#F8F8F8] dark:bg-[#030712] min-h-screen">
      <title>{t('projectsPage__title')}</title>
      < NavBar navigation={navigation} user={user} />
      <div className="min-h-screen mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        {
          user ?
          <div>
            <div className="h-20">Navbar</div>
            <div>
              <div className="flex flex-col-reverse md:flex-row mt-3 gap-1 sm:gap-2 md:gap-3">
                <div className="md:w-5/6 mt-2 md:mt-0 pt-1 md:pt-2 flex justify-center">
                  {
                    data && data.length > 0 ?
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-2">
                      {data.map((project) => (<ProjectComponent project={project}/>))}
                    </div>
                    :
                    <div>
                      <h1 className="text-3xl mt-6 mb-3 font-bold text-center"> { t('no projects') } </h1>
                      <h3 className="text-xl font-semibold text-center">{t('no projects description')}</h3>
                    </div>
                  }
                </div>
                <div className="md:w-1/6 pt-1 md:pt-2">
                  <div className={classNames(
                    "justify-center",
                    "md:flex md:flex-col md:items-center",
                  )}>
                    <Link
                      to={'/create-project'}
                    >
                      <div className="inline-flex gap-1 justify-center items-center px-4 p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
                        <FaPlus fontSize={16} />
                        { t('create project button') }
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              {isLoading && < LoadingScreen />}
            </div>
          </div>
          :
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl mb-3 font-semibold"> { t('myprojects needed login') } </h1>
              <TelegramLogin />
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default MyProjects
