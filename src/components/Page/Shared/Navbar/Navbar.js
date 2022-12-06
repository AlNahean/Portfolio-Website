import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import TextScrambler from "react-scramble-text";
// import "react-scramble-text/dist/index.css";
// import { useScramble } from "use-scramble";
import Scrambler from "scrambling-text";

import { AiOutlineMenu } from "react-icons/ai";
import { MdClose, MdDarkMode } from "react-icons/md";
import { useGlobalContext } from "../../../Context";

import { BsFillSunFill } from "react-icons/bs";

const Navbar = ({}) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showNavItem, setShowNavItem] = useState(false);
  // const [isDarkMode, setISDarkmode] = useState(false);
  const { isDarkMode, setISDarkmode } = useGlobalContext();
  const NavbarTarget = useRef();
  // define the text to be scrambled as state.
  const [text, setText] = useState("<Nahean/>");
  // create an instance of Scrambler using useRef.
  const scramblerRef = useRef(new Scrambler());

  useEffect(() => {
    // call scramble function with the text to be scrambled and handler.

    scramblerRef.current.scramble(text, setText);
    setInterval(() => {
      scramblerRef.current.scramble(text, setText);
    }, 4000);
  }, []);
  const scrollAction = () => {
    let scrolledHeight = document.body.scrollHeight - window.innerHeight;
    let scrolled = (window.scrollY / scrolledHeight) * 100;
    setScrollPercent(scrolled);

    let pageYOffset = window.pageYOffset;
    let Navbar = document.querySelector("#navbar");
    if (pageYOffset > 70) {
      // Navbar.style.backgroundColor = "red";
      // NavbarTarget.current.style.backgroundColor = "#0706068f";
      NavbarTarget.current.classList.add("box-shadow");
      NavbarTarget.current.classList.add("navbar-blur");
      // NavbarTarget.current.style.border = "1px solid red";
    } else {
      // Navbar.style.backgroundColor = "transparent";
      // NavbarTarget.current.style.backgroundColor = "transparent";
      NavbarTarget.current.classList.remove("box-shadow");
      NavbarTarget.current.classList.remove("navbar-blur");
      // NavbarTarget.current.style.border = "none";
    }
  };

  useEffect(() => {
    scrollAction();
    window.addEventListener("scroll", scrollAction);
    return () => {
      window.removeEventListener("scroll", scrollAction);
    };
  }, []);

  return (
    <>
      <nav
        className=" navbar navbar-expand-md  fixed-top p-0"
        style={{ backgroundColor: "#fffff100", zIndex: 1000 }}
        id="navbar"
        ref={NavbarTarget}
      >
        <div className=" container ">
          <Link to="/" className=" navbar-brand pt-0 pb-0 text-primary">
            {text}
          </Link>
          <button
            className=" navbar-toggler"
            onClick={() => {
              setShowNavItem(!showNavItem);
            }}
          >
            <div className="center" style={{ fontSize: "1.8rem" }}>
              {showNavItem ? <MdClose /> : <AiOutlineMenu />}
            </div>
          </button>
          <div
            className={`navbar-collapse h-100 ${
              showNavItem ? "show" : "collapse"
            }`}
            style={{ color: "white" }}
          >
            <div className="ms-auto navbar-nav h-100 center  ">
              <a
                href="#main"
                className=" nav-item ms-4 me-4 text-decoration-none fw-bold"
              >
                Home
              </a>
              <a href="#about" className=" nav-item ms-4 me-4">
                About
              </a>
              <a href="#projects" className=" nav-item ms-4 me-4">
                Projects
              </a>
              <a href="#contact-me" className=" nav-item ms-4 me-4">
                Contact Me
              </a>
              {/* <Link to="/resume" className=" nav-item ms-4 me-4">
                Resume
              </Link> */}

              <div className="  get-navbar-color mb-1">
                <div
                  className=" "
                  style={{ fontSize: "1.7rem" }}
                  onClick={(e) => {
                    // console.log("boxCustomize", boxCustomize);
                    // console.log(e.target.checked);

                    var element = document.getElementById("body");

                    if (isDarkMode) {
                      element.setAttribute("data-layout-color", "light");
                      setISDarkmode(false);
                    } else {
                      element.setAttribute("data-layout-color", "dark");
                      setISDarkmode(true);
                    }
                  }}
                >
                  {isDarkMode ? <MdDarkMode /> : <BsFillSunFill />}
                </div>
                {/* <input
                  type="checkbox"
                  className="form-check-input "
                  id="modeSwitcher"
                  checked={isDarkMode}
                  onChange={(e) => {}}
                  onClick={(e) => {
                    // console.log("boxCustomize", boxCustomize);
                    // console.log(e.target.checked);

                    var element = document.getElementById("body");

                    if (e.target.checked) {
                      element.setAttribute("data-layout-color", "dark");
                      setISDarkmode(e.target.checked);
                    } else {
                      element.setAttribute("data-layout-color", "light");
                      setISDarkmode(e.target.checked);
                    }
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>

        <div
          className=" position-absolute bottom-0 bg-primary"
          style={{ height: "3px", width: `${scrollPercent}%` }}
        ></div>
      </nav>
    </>
  );
};

export default Navbar;
