import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../interfaces/auth';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '../utils/functions';
import { logout } from '../app/features/authSlice';
import {Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import toast from 'react-hot-toast';


type AvatarProps = {
  user: User;
};

const Avatar: React.FC<AvatarProps> = ({user}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout_user = () => {
    dispatch(logout());
    toast.success(t('logout_success'));
    navigate('/');
  }

  return (
    <Menu as="div" className="relative ml-3">
    <div>
      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <div className="rounded-full w-[3rem] shadow-2xl pointer-events-none">
        { user?.photo_url ? <img src={user.photo_url} alt="Profile" className="rounded-full"/> : <h1 className="text-2xl">{user?.first_name.charAt(0)}</h1>}
        </div>
      </MenuButton>
    </div>
    <MenuItems
      transition
      className= { classNames(
        "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 ring-1 shadow-lg  transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in",
        "bg-white dark:bg-gray-700 ring-black/5 text-gray-700 dark:text-gray-200"
      ) }
    >
      <MenuItem>
        <div
          className="block px-4 py-2 text-sm data-focus:bg-gray-100 dark:data-focus:bg-gray-500 data-focus:outline-hidden"
        >
          { user?.first_name } { user?.last_name }
        </div>
      </MenuItem>
      <MenuItem>
        <button
          onClick={logout_user}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 data-focus:bg-gray-100 dark:data-focus:bg-gray-500  data-focus:outline-hidden"
        >
          { t('logout') }
        </button>
      </MenuItem>
    </MenuItems>
    </Menu>
  )
}

export default Avatar
