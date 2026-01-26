import React from "react";
import errorImg from "../assets/svg404.webp";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6">
      <div className="w-full max-w-2xl text-center">
        <img
          src={errorImg}
          alt="404 - Page not found"
          className="
            mx-auto
            w-full
            max-w-[280px]
            sm:max-w-[340px]
            md:max-w-[420px]
            h-auto
            mb-6
            sm:mb-8
          "
        />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F0F0F] mb-3">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#484848] max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
