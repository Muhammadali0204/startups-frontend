import { classNames } from '../../utils/functions'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { DisclosureButton } from '@headlessui/react'

const DisclosureButtonComp = () => {
  return (
    <DisclosureButton className={classNames(
      "group relative inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-hidden focus:ring-inset",
      "dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-white",
      "hover:bg-gray-200 focus:ring-black"
    )}>
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open main menu</span>
      <HiBars3 aria-hidden="true" className="block size-6 group-data-open:hidden" />
      <HiXMark aria-hidden="true" className="hidden size-6 group-data-open:block" />
    </DisclosureButton>
  )
}

export default DisclosureButtonComp
