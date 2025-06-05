import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation()


  return (
    <footer className="h-40 mt-30 bg-white dark:bg-[#162B3A] text-gray-700 dark:text-gray-300 py-8">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-xl font-bold">
          Startups
        </div>

        <div className="mt-4 md:mt-0 text-sm font-semibold">
          &copy; {new Date().getFullYear()} Startups. {t('footer__rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
