import { useRef, useState } from "react";
import Editor, { EditorRef } from "../components/Editor";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../app/service/projectApi";
import LoadingScreen from "../components/minicomponents/LoadingScreen";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import { NavigationItem } from "../interfaces/other";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Footer from "../components/Footer";
import TelegramLogin from "../components/minicomponents/TelegramLogin";


const CreateProject = () => {
  const {t} = useTranslation();
  const editorRef = useRef<EditorRef>(null);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => (state.auth.user))
  const [createProject, {isLoading}] = useCreateProjectMutation();
  const [requiredFunds, setRequiredFunds] = useState(0)

  const handleSave = async () => {
    if (editorRef.current) {
      if (requiredFunds <= 0){
        toast.error(
          t('amount error')
        )
        return
      }
      const data = await editorRef.current.save();
      
      const blocks = data.blocks;

      if (!blocks || blocks.length < 2) {
        toast.error(t('validation__too_few_blocks'));
        return;
      }

      const block0 = blocks[0];
      const block1 = blocks[1];

      const isValid =
        block0.type === "header" &&
        block0.data?.level === 3 &&
        block0.data?.text?.length > 5 &&
        block0.data?.text?.length < 50 &&
        block1.type === "header" &&
        block1.data?.level === 5 &&
        block1.data?.text?.length > 10 &&
        block1.data?.text?.length < 500;

      if (!isValid) {
        toast.error(t('validation__invalid_blocks'));
        return;
      }

      const extendedData = {...data, requiredFunds: requiredFunds}
      await createProject(extendedData).unwrap()
      .then(() => {
        toast.success(t('project__created'));
        navigate('/my-projects');
      })
      .catch((error) => {
        const err = error as {
          status: number;
          data: { detail?: string; message?: string };
        };
        if(err.status === 401) {
          toast.error(t('error__unauthorized')); 
        }else{
          toast.error(t('error__not-created'));
        }
        navigate('/my-projects');
      })
    }
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredFunds(Number.parseInt(event.target.value))
  }

  const navigation: NavigationItem[] = [
    { name: t('nav__home'), href: '/', current: false },
    { name: t('nav__projects'), href: '/my-projects', current: false },
  ]

  return (
    <div className="text-black dark:text-white bg-[#F8F8F8] dark:bg-[#030712] min-h-screen">
      <title>{t('createProjectPage__title')}</title>
      < NavBar navigation={navigation} user={user} />
      {
        user ? 
        <div className="min-h-screen mx-auto mt-8 max-w-8xl px-2 sm:px-6 lg:px-8">
          <div className="h-20"></div>
          <div className="flex flex-col md:flex-row gap-1 sm:gap-2 md:gap-3 p-0.5 sm:p-1 md:p-2">
            <div className="md:w-5/6 flex justify-center">
              <Editor ref={editorRef} readOnly={false} />
            </div>
            <div className="md:w-1/6 flex flex-col gap-2 p-4 bg-white dark:bg-[#14313A] md:min-h-screen rounded-3xl">
              <div className="flex flex-col justify-center gap-2">
                <h1 className="text-sm text-center font-bold mb-2">{t('ask amount')}</h1>
                <input
                  type="number"
                  className="text-md text-center p-2 border-2 border-blue-500 focus:border-blue-700 focus:ring-2 dark:bg-white dark:text-black focus:ring-blue-700 focus:outline-none rounded-lg shadow-lg transition"
                  placeholder={t('enter amount')}
                  onChange={handleAmount}
                />
              </div>
              
              <div className="w-full flex-row-reverse flex justify-between items-center md:gap-2 md:flex-col mt-8">
                <button
                  onClick={handleSave}
                  className="md:w-full p-2 border-2 border-blue-500 hover:ring-2 ring-blue-700 dark:bg-blue-500 rounded-lg shadow-lg transition"
                >
                  {t('create project')}
                </button>
                <Link
                  to={'/my-projects'}
                  className="md:w-full flex items-center p-2 border-2 border-amber-300 hover:ring-2 dark:bg-amber-300 ring-amber-500 rounded-lg shadow-lg transition"
                >
                  <p className="text-center w-full">{t('back')}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl mb-3 font-semibold"> { t('create project needed login') } </h1>
            <TelegramLogin />
          </div>
        </div>
      }
      <Footer />
      { isLoading && <LoadingScreen />}
    </div>
  );
}

export default CreateProject
