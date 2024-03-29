import React, { Suspense } from "react";
import Typewriter from "typewriter-effect";
import WordSphere from "./WordSphere";
import FaceAscii from "./FaceAscii";

const MainSection = () => {
  return (
    <main className=" home-wrapper container" id="main">
      <div className=" home-hero row position-relative">
        <div
          className=" col-12 col-md-6 d-flex flex-column justify-content-center hero-text hero-section"
          style={
            {
              // border: "1px solid red",
              // fontSize: fontSize,
            }
          }
        >
          <h1 className=" hero-text text-white ">Hello World</h1>
          <h1 className=" mb-4 hero-text">
            <span className=" text-white">I'm</span> <span>Nahean</span>
          </h1>

          <small className="ty-e-text " style={{ whiteSpace: "nowrap" }}>
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
        <div className=" col-12 col-md-6 center hero-section">
          <WordSphere />
          {/* <img
            src="./Images/undraw_programming_re_kg9v.svg"
            alt=""
            style={{ width: "100%" }}
          /> */}
        </div>
      </div>
      <div className=" row mb-4 mt-5 ">
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
              <span className=" my-primary">web technologies and products</span>
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
          <Suspense fallback={<>loading</>}>
            <FaceAscii />
          </Suspense>
          {/* <img
            src="./Images/undraw_profile_pic_ic-5-t.svg"
            alt=""
            // height="400"
            style={{ width: "100%" }}
          /> */}
        </div>
      </div>
    </main>
  );
};

export default MainSection;
