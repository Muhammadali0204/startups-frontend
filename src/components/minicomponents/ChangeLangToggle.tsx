import { Listbox } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export const LANGUAGES = ["uz", "en", "ru"];

const ChangeLangToggle = () => {
  const { i18n } = useTranslation();

  const storedLang = localStorage.getItem("i18nextLng");
  const defaultLang = LANGUAGES.includes(storedLang!) ? storedLang! : "uz";

  const [selectedLang, setSelectedLang] = useState(defaultLang);

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang, i18n]);

  return (
    <div className="relative">
      <Listbox value={selectedLang} onChange={setSelectedLang}>
        <Listbox.Button className="p-2 w-auto rounded-md bg-white dark:bg-[#0F172A] hover:bg-[#F5F7FA] dark:hover:bg-[#17222B] font-bold">
          {selectedLang.toUpperCase()}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-auto bg-white dark:bg-[#0F172A] rounded-md shadow-lg">
          {LANGUAGES.map((lang) => (
            <Listbox.Option
              key={lang}
              value={lang}
              className={({ active }) =>
                `p-2 cursor-pointer ${
                  active ? "bg-gray-200 dark:bg-[#1E293B]" : ""
                }`
              }
            >
              {lang.toUpperCase()}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ChangeLangToggle;
