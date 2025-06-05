import Editor, { EditorRef } from "../components/Editor";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom"
import { useDeleteMyProjectMutation, useGetProjectQuery, useSetProjectLikeMutation, useSetProjectShareMutation, useUpdateProjectMutation } from "../app/service/projectApi";
import LoadingScreen from "../components/minicomponents/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaShareSquare, FaTelegram } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Modal from "../components/minicomponents/Modal";
import NavBar from "../components/NavBar";
import { NavigationItem } from "../interfaces/other";
import Footer from "../components/Footer";


const ShowProject = () => {
  const {id} = useParams<string>();
  const {t} = useTranslation();
  const editorRef = useRef<EditorRef>(null);
  const {data, error, isLoading, isError, isSuccess } = useGetProjectQuery(id as string);
  const user = useSelector((state: RootState) => (state.auth.user))
  const [putting, setPutting] = useState(false)
  const [setProjectLike] = useSetProjectLikeMutation()
  const [updateProject] = useUpdateProjectMutation()
  const [setProjectShare] = useSetProjectShareMutation()
  const [liked, setLiked] = useState(false)
  const [editModeOn, setEditModeOn] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [deleteProject] = useDeleteMyProjectMutation()
  const navigate = useNavigate();

  useEffect(() => {
    if (isError){
      const err = error as {
        status: number;
        data: { detail?: string; message?: string };
      };
      if(err.status === 404 || err.status == 422){
        toast.error(
          t('project not found')
        )
        navigate('/')
      }else{
        toast.error(
          t('error__fetching data')
        )
      }
    }
  }, [isError])

  useEffect(() => {
    if(data){
      setLiked(data.liked)
    }
  }, [isSuccess, data])

  const clickLike = () => {
    if (user){
      if (liked){
        setLiked(false)
        setProjectLike(data?.id)
      }
      else{
        setLiked(true)
        setProjectLike(data?.id)
      }
    }else{
      toast.error(
        t('not logged')
      )
    }
  }
  const clickShare = () => {
    try{
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('copied'))
      if (user){
        setProjectShare(data?.id)
      }
    }
    catch{
      toast.error(t('copy error'))
    }
  }

  useEffect(() => {
    if (data){
      setInputValue(data.required_funds)
    }
  }, [data])

  useEffect(() => {
    if (!editModeOn){
      setInputValue(data?.required_funds ?? 0)
    }
  }, [editModeOn])

  const handleDelete = async () => {
    setShowDeleteModal(false);
    try {
      await deleteProject(data?.id).unwrap();
      toast.success(t('project deleted'));
      navigate('/my-projects');
    } catch {
      toast.error(t('delete failed'));
    }
  };

  const handleTelegram = () => {
    window.open(`https://t.me/${data?.user.username}`, '_blank')
  }

  const handleChange = (e: any) => {
    if (editModeOn) {
      setInputValue(e.target.value);
    }
  };

  const saveProjectHandle = async () => {
    if (editorRef.current) {
      if (inputValue <= 0){
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

      const extendedData = {...data, requiredFunds: inputValue}
      setPutting(true)
      await updateProject(
        {
          project_id: id,
          body: extendedData
        }
      ).unwrap()
      .then(() => {
        toast.success(t('project__edited'));
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
          toast.error(t('error__not-edited'));
        }
        setPutting(false)
        navigate('/my-projects');
      })
    }
  }

  const navigation: NavigationItem[] = [
    { name: t('nav__home'), href: '/', current: false },
    { name: t('nav__projects'), href: '/my-projects', current: false },
  ]

  return (
    <div className="text-black dark:text-white bg-[#F8F8F8] dark:bg-[#030712] min-h-screen">
      <title>{t('showProjectPage__title')}</title>
      < NavBar navigation={navigation} user={user} />
      <div className="min-h-screen mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="h-20">Navbar</div>
        <div className="flex flex-col mt-8 md:flex-row gap-1 sm:gap-2 md:gap-3 p-0.5 sm:p-1 md:p-2">
          <div className="md:w-2/3 lg:w-4/5 flex justify-center">
            {data?.data && <Editor ref={editorRef} key={editModeOn ? 'edit' : 'view'} readOnly={!editModeOn} data={data?.data}/>}
          </div>
          <div className="md:w-1/3 lg:w-1/5 flex flex-col gap-2 p-4 bg-white dark:bg-[#14313A] md:min-h-screen rounded-3xl">
            <div className="flex py-2 justify-evenly items-center w-full mt-4">
              <div className="flex gap-1 items-center hover:cursor-pointer">
                <div onClick={clickLike}>
                  {liked ? <AiFillHeart size={24} color="red" /> : <AiOutlineHeart size={24} />}
                </div>
                {data?.likes_count}
              </div>
              <div className="flex gap-1 items-center">
                <FaEye size={24} className="dark:white indigo"/>
                {data?.views_count}
              </div>
              <div className="flex gap-1 items-center hover:cursor-pointer">
                <FaShareSquare size={24} onClick={clickShare} color="blue"/>
                {data?.shares_count}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-sm text-center font-bold mb-2">{t('amount')}</h1>
              <input
                type="number"
                className="text-md p-2 border-2 text-center border-blue-500 focus:border-blue-700 focus:ring-2 dark:bg-white dark:text-black focus:ring-blue-700 focus:outline-none rounded-lg shadow-lg transition"
                value={inputValue}
                onChange={handleChange}
                readOnly={editModeOn ? false : true}
              />
            </div>
            {
              (data?.user.telegram_id === user?.telegram_id)
              ?
                (editModeOn
                ? 
                  <div className="w-full flex-row-reverse flex justify-between items-center md:gap-2 md:flex-col mt-8">
                    <button
                      onClick={saveProjectHandle}
                      className="md:w-full p-2 border-2 border-blue-500 hover:ring-2 ring-blue-700 dark:bg-blue-500 rounded-lg shadow-lg transition hover:font-bold hover:cursor-pointer duration-200"
                    >
                      {t('save project')}
                    </button>
                    <button
                      onClick={() => setEditModeOn(false)}
                      className="md:w-full p-2 border-2 border-amber-300 hover:ring-2 ring-amber-500 dark:bg-amber-300 rounded-lg shadow-lg transition hover:font-bold hover:cursor-pointer duration-200"
                    >
                      {t('back')}
                    </button>
                  </div>
                :
                  <div className="w-full flex-row-reverse flex justify-between items-center md:gap-2 md:flex-col mt-8">
                    <button
                      onClick={() => setEditModeOn(true)}
                      className="md:w-full p-2 border-2 border-blue-500 hover:ring-2 ring-blue-700 dark:bg-blue-500 rounded-lg shadow-lg transition hover:font-bold hover:cursor-pointer duration-200"
                    >
                      {t('edit project')}
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="md:w-full p-2 border-2 border-red-500 hover:ring-2 ring-red-700 dark:bg-red-500 rounded-lg shadow-lg transition hover:font-bold hover:cursor-pointer duration-200"
                    >
                      {t('delete project')}
                    </button>
                  </div>
                )
              :
                <div className="px-6 py-4 border-2 border-indigo-500 shadow-4xl rounded-lg mt-8 flex flex-col gap-4 items-center m-2">
                  <div>
                    <h1 className="text-lg text-center">{t('author')} :</h1>
                    <h1 className="text-xl text-center font-semibold mb-2">{data?.user.first_name} {data?.user.last_name}</h1>
                    {
                      data?.user.username ? 
                        <div className="flex gap-0.5 items-center border-1 bg-blue-500 p-1 rounded-lg hover:cursor-pointer"
                          onClick={handleTelegram}
                        >
                          <FaTelegram size={28} />
                          <p className="text-xs text-center">{t('contact via telegram')}</p>
                        </div>
                      :
                        <div className="flex gap-0.5 items-center border-1 bg-red-400 p-1 rounded-lg">
                          {t('no username')}
                        </div>
                    }
                  </div>
                </div>
            }
          </div>
        </div>
        <Modal
          isOpen={showDeleteModal}
          title={t("confirm delete")}
          message={t("are you sure")}
          buttons={[
            {
              label: t("no"),
              onClick: () => setShowDeleteModal(false),
              className: "bg-gray-200 hover:bg-gray-300"
            },
            {
              label: t("yes"),
              onClick: handleDelete,
              className: "bg-red-500 text-white hover:bg-red-600"
            }
          ]}
        />
      </div>
      <Footer />
      {(isLoading || putting) && <LoadingScreen />}
    </div>
  )
}

export default ShowProject