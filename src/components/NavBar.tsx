import { Disclosure } from '@headlessui/react';
import { createPortal } from "react-dom";

import Avatar from "./Avatar";
import { User } from "../interfaces/auth";
import NavButtons from "./minicomponents/NavButtons";
import { NavigationItem } from "../interfaces/other";
import TelegramLogin from "./minicomponents/TelegramLogin";
import DarkModeToggle from "./minicomponents/DarkModeToggle";
import DisclosurePanel from "./minicomponents/DisclosurePanel";
import ChangeLangToggle from "./minicomponents/ChangeLangToggle";
import DisclosureButtonComp from "./minicomponents/DisclosureButtonComp";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';



type NavbarProps = {
  navigation: NavigationItem[];
  user: User | undefined;
};

const NavBar: React.FC<NavbarProps> = ({navigation, user}) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo( { top: 0, left: 0, behavior: 'smooth' } );
  }, [pathname]);

  return createPortal(
    <Disclosure as="nav" className="dark:bg-[#162B3A] bg-white fixed top-0 left-0 right-0 z-50 dark:text-white text-black">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className='flex items-center'>
            <div className="sm:hidden">
              <DisclosureButtonComp />
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ml-2">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Logo"
                  src="/images/logo.png"
                  className="h-8 w-auto"
                />
                <p className='font-bold hidden sm:block'>Startups</p>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <NavButtons navigation={navigation}/>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-0.5 sm:gap-1 lg:gap-2">
            < ChangeLangToggle />
            < DarkModeToggle />
            {user ?
              < Avatar user={user} />
              :
              < TelegramLogin />
            }
          </div>
        </div>
      </div>
      <DisclosurePanel navigation={navigation} />
    </Disclosure>,
    document.body
  )
}

export default NavBar
