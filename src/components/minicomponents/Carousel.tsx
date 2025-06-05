import ShortProject from "./ShortProject";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ShortProjectInterface } from "../../interfaces/project";

interface CarouselProjectsProps {
  projects: ShortProjectInterface[];
}

const Carousel: React.FC<CarouselProjectsProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const autoSlideInterval = 5000;

  const calculateSlidesToShow = () => {
    const width = containerRef.current?.offsetWidth;
    if (width) {
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }
    return 3;
  };

  useEffect(() => {
    const updateSlides = () => {
      const newSlides = calculateSlidesToShow();
      setSlidesToShow(newSlides);
      setCurrentIndex((prev) => Math.min(prev, projects.length - newSlides));
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = projects.length - slidesToShow;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex <= 0 ? projects.length - slidesToShow : prevIndex - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [slidesToShow]);
  const extendedProjects = [...projects, ...projects.slice(0, slidesToShow)];

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        className="flex transition-transform duration-1500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
        }}
      >
        {extendedProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="flex-shrink-0 px-2"
            style={{ width: `${100 / slidesToShow}%` }}
          >
            <ShortProject project={project} />
          </div>
        ))}
      </div>

      {projects.length > slidesToShow && (
        <>
          <button
            className="absolute mx-4 left-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-2 text-gray-700 shadow-md hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute mx-4 right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-2 text-gray-700 shadow-md hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
