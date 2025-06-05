import React from "react";
import { Link } from "react-router-dom"
import { classNames } from "../../utils/functions"
import { NavigationItem } from "../../interfaces/other"

type NavButtonsProps = {
  navigation: NavigationItem[];
}

const NavButtons: React.FC<NavButtonsProps> = ({navigation}) => {
  return (
    <div className="flex space-x-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          aria-current={item.current ? 'page' : undefined}
          className={classNames(
            item.current ? 'dark:bg-gray-900 bg-gray-200' : 'dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100',
            'rounded-md px-3 py-2 text-sm font-medium',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default NavButtons
