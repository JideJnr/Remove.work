
import React, { Fragment } from "react";
import { useDarkMode } from "../../context/DarkMode.tsx";

const Footer = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();


  return (
    <Fragment>
      <footer className={`"footer mt-auto xl:ps-[15rem]  font-normal font-inter  text-defaultsize leading-normal text-[0.8
      13] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] dark:bg-bodybg py-4 text-center ${isDarkMode ? 'bg-customLightBlue text-black':'bg-black text-white'}`}>
        <div className="container">
          <span className="text-gray dark:text-defaulttextcolor/50">
            {" "}
            Copyright © <span id="year">2025</span>{" "}
            <span
              
              className="text-defaulttextcolor font-semibold dark:text-defaulttextcolor"
            >
              Remote-Work
            </span>{" "}
            All rights reserved{" "}
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
