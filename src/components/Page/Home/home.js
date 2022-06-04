import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
import Navbar from "../Shared/Navbar/Navbar";
import Typewriter from "typewriter-effect";
import TypewriterComponent from "typewriter-effect";
import {
  GrTwitter,
  GrFacebookOption,
  GrGithub,
  GrLinkedinOption,
} from "react-icons/gr";
import Footer from "../Shared/Navbar/Footer/Footer";

const socialLinksData = [
  {
    id: 1,
    title: "Twitter",
    link: "#",
    icon: <GrTwitter />,
  },
  {
    id: 1,
    title: "Facebook",
    link: "#",
    icon: <GrFacebookOption />,
  },
  {
    id: 1,
    title: "Github",
    link: "#",
    icon: <GrGithub />,
  },
  {
    id: 1,
    title: "linked In",
    link: "#",
    icon: <GrLinkedinOption />,
  },
];
// import { useState } from "react";
// import "./Home.css";

const Home = () => {
  const { test } = useGlobalContext();
  let fontSize = "4.5rem";

  return (
    <div
      style={
        {
          // backgroundColor: "#212529"
        }
      }
    >
      <Navbar />

      <main className=" home-wrapper container">
        <div className=" home-hero row">
          <div
            className=" col-12 col-md-7 d-flex flex-column justify-content-center hero-text"
            style={
              {
                // border: "1px solid red",
                // fontSize: fontSize,
              }
            }
          >
            <h1 className=" hero-text">Hello World</h1>
            <h1 className=" mb-4 hero-text">
              I'm <span>Nahean</span>
            </h1>

            <small>
              <Typewriter
                options={{
                  strings: [
                    "Front End Developer",
                    "Web developer",
                    "React Developer",
                    "Full Stack Developer",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </small>
          </div>
          <div className=" col-12 col-md-5 center">
            <img
              src="./Images/undraw_programming_re_kg9v.svg"
              alt=""
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className=" row mb-4 ">
          <div className=" col-12 col-md-8 home-description">
            <div className=" header w-100 d-flex justify-content-center m-2">
              <h1>
                Let Me <span className=" my-primary">introduce</span> myself
              </h1>
            </div>
            <div className=" body">
              <p>I love Programing</p>
              <p>I am a self learner</p>
              <p>
                {" "}
                I have a strong knowledge in{" "}
                <span className=" my-primary">Javascript React </span>
              </p>
              <p>
                My field of interest is building{" "}
                <span className=" my-primary">
                  web technologies and products
                </span>
              </p>
              <p>
                Whenever possible, I also apply my passion for developing
                solutions with{" "}
                <span className=" my-primary">
                  Modern Javascript Library and Frameworks
                </span>
                <span className=" my-primary">like React.js</span>
              </p>
            </div>
          </div>
          <div className=" col-12 col-md-4 center">
            <img
              src="./Images/undraw_profile_pic_ic-5-t.svg"
              alt=""
              // height="400"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="social-section w-100">
          <h1 className=" w-100 d-flex justify-content-center">Find me on</h1>
          <p className=" d-flex justify-content-center">
            Feel free to connect with me
          </p>
          <div className=" d-flex justify-content-evenly align-items-center ">
            <div className=" d-flex">
              {/* Social Links Data */}
              {socialLinksData.map((item) => {
                return (
                  <a
                    href={item.link}
                    key={item.id}
                    className="center bg-primary rounded-circle p-2 m-2 text-decoration-none text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
