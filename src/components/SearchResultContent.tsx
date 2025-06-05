import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { ErrorResponse, NavigationItem } from "../interfaces/other";
import ProjectComponent from "../components/minicomponents/ShortProject";
import toast from "react-hot-toast";
import NavBar from "./NavBar";
import SearchInput from "./minicomponents/SearchInput";
import Footer from "./Footer";
import LoadingScreen from "./minicomponents/LoadingScreen";
import { useSearchProjectQuery } from "../app/service/projectApi";

type Props = {
  q: string;
};

export const SearchResultsContent = ({ q }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, error } = useSearchProjectQuery(q);

  useEffect(() => {
    if (error) {
      const err = error as ErrorResponse;
      if (err.status != 404) {
        toast.error(t('search error'));
        navigate('/');
      }
    }
  }, [error]);

  const navigation: NavigationItem[] = [
    { name: t('nav__home'), href: '/', current: false },
    { name: t('nav__projects'), href: '/my-projects', current: false },
  ];

  return (
    <div className="text-black dark:text-white bg-[#F8F8F8] dark:bg-[#030712] min-h-screen">
      <title>{t('mainPage__title')}</title>
      <NavBar navigation={navigation} user={user} />
      <div className="min-h-screen mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className='h-20'>Navbar</div>
        <div className="flex justify-center my-8">
          <SearchInput />
        </div>
        {
          data && data.length > 0 ? (
            <div className='flex flex-col justify-center items-center gap-8'>
              <h1 className='text-4xl font-bold text-start'>{t('Siz qidirgan loyihalar :')}</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-2">
                {data.map((project) => (<ProjectComponent key={project.id} project={project}/>))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-8">
              <div className='px-6 md:px-8 py-4 md:py-6 dark:bg-[#162B3A] bg-white rounded-4xl w-fit'>
                <h1 className="text-3xl mt-6 mb-3 font-bold text-center"> { t('projects not found') } </h1>
              </div>
            </div>
          )
        }
      </div>
      <Footer />
      {isLoading && <LoadingScreen />}
    </div>
  );
};
