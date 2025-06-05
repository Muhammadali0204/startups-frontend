import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem("loadingAnimation");
    if (cachedData) {
      setAnimationData(JSON.parse(cachedData));
    } else {
      fetch("/animations/loading.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("loadingAnimation", JSON.stringify(data));
          setAnimationData(data);
        })
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-xs">
      <div className="w-36 h-36 sm:w-48 sm:h-48">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default LoadingScreen;
