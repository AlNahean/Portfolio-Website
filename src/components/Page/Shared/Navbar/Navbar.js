import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useGlobalContext } from "../../../Context";

const Navbar = ({}) => {
  const [showNavItem, setShowNavItem] = useState(false);
  // const [isDarkMode, setISDarkmode] = useState(false);
  const { isDarkMode, setISDarkmode } = useGlobalContext();
  const NavbarTarget = useRef();
  const scrollAction = () => {
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
            {"< Nahean /> "}
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
              <Link
                to="/"
                className=" nav-item ms-4 me-4 text-decoration-none fw-bold"
              >
                Home
              </Link>
              <Link to="/about" className=" nav-item ms-4 me-4">
                About
              </Link>
              <Link to="/projects" className=" nav-item ms-4 me-4">
                Projects
              </Link>
              {/* <Link to="/resume" className=" nav-item ms-4 me-4">
                Resume
              </Link> */}

              <div className=" form-check form-switch  ms-4 me-4 get-navbar-color">
                {isDarkMode ? "dark" : "light"}
                <input
                  type="checkbox"
                  className="form-check-input"
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
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
