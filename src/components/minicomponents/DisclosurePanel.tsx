import React from "react";
import { DisclosurePanel } from '@headlessui/react';
import { Link } from "react-router-dom";
import { NavigationItem } from "../../interfaces/other";

type DisclosurePanelProps = {
  navigation: NavigationItem[];
};


const DisclosurePanelComponent: React.FC<DisclosurePanelProps> = ({navigation}) => {
  function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'dark:bg-gray-900 bg-gray-200' : 'dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100',
              'block rounded-md px-3 py-2 text-base font-medium',
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </DisclosurePanel>
  )
}

export default DisclosurePanelComponent;

