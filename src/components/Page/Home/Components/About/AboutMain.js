import React from "react";

import {
  FaReact,
  FaNodeJs,
  FaSass,
  FaNode,
  FaCss3Alt,
  FaGithub,
} from "react-icons/fa";
import { GrGraphQl, GrWindows } from "react-icons/gr";
import {
  SiRedux,
  SiAdobephotoshop,
  SiSocketdotio,
  SiAdobeaftereffects,
  SiGreensock,
} from "react-icons/si";
import { DiJavascript1 } from "react-icons/di";
const SkillsetData = [
  {
    id: 1,
    title: "",
    icon: <FaReact />,
  },
  {
    id: 2,
    title: "",
    icon: <FaNode />,
  },
  {
    id: 3,
    title: "",
    icon: <FaCss3Alt />,
  },
  {
    id: 4,
    title: "",
    icon: <DiJavascript1 />,
  },
  {
    id: 5,
    title: "",
    icon: <SiSocketdotio />,
  },
  {
    id: 6,
    title: "",
    icon: <GrGraphQl />,
  },
  {
    id: 7,
    title: "",
    icon: <FaSass />,
  },
  {
    id: 8,
    title: "",
    icon: <SiGreensock />,
  },
];
const ToolsData = [
  {
    id: 1,
    title: "",
    icon: <GrWindows />,
  },
  {
    id: 2,
    title: "",
    icon: <FaGithub />,
  },
  {
    id: 3,
    title: "",
    icon: <SiAdobephotoshop />,
  },
  {
    id: 4,
    title: "",
    icon: <SiAdobeaftereffects />,
  },
];

const AboutMain = () => {
  return (
    <main className=" container about-wrapper" id="about">
      <div className=" row">
        <div className=" col-12 col-md-8">
          <h1 className=" w-100 d-flex justify-content-center mb-3">
            Who <span className=" my-primary ms-2"> I am</span>
          </h1>
          <div className=" about-info">
            <p>
              Hi, I am <span className=" my-primary me-2">Nahean.</span>I live
              in <span className=" my-primary">Bangladesh.</span>
            </p>
            <p>
              I love to develop web solutions using{" "}
              <span className=" my-primary me-2">Javascript</span>
              and <span className=" my-primary">React</span>
            </p>
            <p>
              Apart from coding, some other{" "}
              <span className=" my-primary me-2">activities</span>
              that I love to do!
            </p>
            <ul className=" activity">
              <li>Traveling</li>
              <li> Listening Music</li>
              <li>Watching Movies</li>
            </ul>
          </div>
        </div>
        <div className=" col-12 col-md-4 center">
          <img
            src="./Images/undraw_feeling_proud_qne1.svg"
            alt=""
            width="100%"
          />
        </div>
      </div>
      <div className=" row justify-content-center g-4 about-skillset mt-4">
        <h1 className=" col-12 d-flex justify-content-center">
          Professional <span className=" my-primary ms-2">Skillset</span>
        </h1>

        {SkillsetData.map((item) => {
          return (
            <div className=" col-6 col-sm-6 col-md-4 col-xl-3 " key={item.id}>
              <div
                className=" w-100 center rounded-3 p-2 skillset-card"
                style={{}}
              >
                {item.icon}
                {/* <FaReact /> */}
              </div>
            </div>
          );
        })}
      </div>
      <div className=" row justify-content-center g-4 mt-4 mb-4 about-tools">
        <h1 className=" col-12 d-flex justify-content-center">
          <span className=" my-primary me-2">Tools</span>I use
        </h1>

        {ToolsData.map((item) => {
          return (
            <div
              className=" col-6 col-sm-6 col-md-4 col-xl-3  shadow-lg "
              key={item.id}
            >
              <div
                className=" w-100 center rounded-3 p-4 about-tools-card"
                style={
                  {
                    // fontSize: "7rem",
                    // color: "black",
                    // border: "1px solid white",
                    // color: "white",
                  }
                }
              >
                {item.icon}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className=" row container">
          <div className=" col-12">
            <h1 className=" w-100 d-flex justify-content-center">
              DAys i code
            </h1>
          </div>
        </div> */}
    </main>
  );
};

export default AboutMain;
