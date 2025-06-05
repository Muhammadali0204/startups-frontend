import React from "react";
import { ShortProjectInterface } from "../../interfaces/project";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface ShortProjectProps {
  project: ShortProjectInterface;
}

const ShortProject: React.FC<ShortProjectProps> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-w-[20rem] h-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-48 overflow-hidden rounded-t-lg">
        <motion.img 
          src={project.image_url ?? 'images/startupdefault.png'}
          className="w-full h-full object-cover"
          whileHover={{scale: 1.05}}
          transition={{duration: 0.1}}
          alt={project.title}
        />
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {/* line-clamp for consistent text blocks */}
          {project.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow"> {/* line-clamp for consistent text blocks */}
          {project.subtitle}
        </p>
        <Link
          to={`/project/${project.id}`}
          className="inline-flex items-center gap-2 px-3 py-2 w-fit bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <h1 className="text-sm font-medium text-white">{t("see project")}</h1>
          <FaArrowRight size={14} className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default ShortProject;