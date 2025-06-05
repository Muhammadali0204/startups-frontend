import { useTranslation } from "react-i18next";
import { NavigationItem } from "../interfaces/other";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { logout } from "../app/features/authSlice";
import Carousel from "../components/minicomponents/Carousel";
import { useGetMostLikedProjectsQuery, useGetMostViewedProjectsQuery } from "../app/service/projectApi";
import SearchInput from "../components/minicomponents/SearchInput";


const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const expiresAt = useSelector((state: RootState) => state.auth.expiresAt);

  const {data: mostViewedProjects} = useGetMostViewedProjectsQuery();
  const {data: mostLikedProjects} = useGetMostLikedProjectsQuery();

  useEffect(() => {
    if (expiresAt && new Date(expiresAt) < new Date()) {
      dispatch(logout())
    }
  }, [])

  const { t } = useTranslation();
  const navigation: NavigationItem[] = [
    { name: t('nav__home'), href: '/', current: true },
    { name: t('nav__projects'), href: '/my-projects', current: false },
  ]

  return (
    <div className="text-black dark:text-white bg-[#F8F8F8] dark:bg-[#030712] min-h-screen">
      <title>{t('mainPage__title')}</title>
      < NavBar navigation={navigation} user={user}/>
      <div className="min-h-screen mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="h-20">Navbar</div>
        <div className="flex justify-center mt-8">
          <SearchInput />
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="md:w-1/2 p-2 md:p-4">
            <h1 className="text-4xl font-bold px-4 md:px-8 text-center">{t('investor title')}</h1>
            <h3 className="text-3xl text-center font-semibold mt-4 sm:mt-8 md:mt-12">{t('investor content')}</h3>
          </div>
          <div className="md:w-1/2 p-8 md:p-16">
            <div className="flex flex-col items-center">
              <img className="max-h-sm object-cover rounded-2xl shadow-2xl" src="/images/growth.jpg" alt="Startup" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-4 ">
          <div className="md:w-1/2 p-8 md:p-16">
            <div className="flex flex-col items-center">
              <img className="max-h-sm object-cover rounded-2xl shadow-2xl" src="/images/startup.jpg" alt="Startup" />
            </div>
          </div>
          <div className="md:w-1/2 p-2 md:p-4">
            <h1 className="text-4xl font-bold px-4 md:px-8 text-center">{t('founder title')}</h1>
            <h3 className="text-3xl text-center font-semibold mt-4 sm:mt-8 md:mt-12">{t('founder content')}</h3>
          </div>
        </div>

        {mostViewedProjects && mostViewedProjects.length > 0  && (
          <>
            <h1 className="text-3xl p-2 font-bold mt-20 md:mt-12">{t('most viewed')}</h1>
            <Carousel projects={mostViewedProjects} />
          </>
        )}
        
        {mostLikedProjects && mostLikedProjects.length > 0 && (
          <div>
            <h1 className="text-3xl p-2 font-bold mb-4 md:mb-8 mt-8 md:mt-12">{t('most liked')}</h1>
            <Carousel projects={mostLikedProjects} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
