import React, { useState } from "react";
import { useGlobalContext } from "../../Context";
import Navbar from "../Shared/Navbar/Navbar";
import Typewriter from "typewriter-effect";
import TypewriterComponent from "typewriter-effect";

import Footer from "../Shared/Navbar/Footer/Footer";
import ProjectsMain from "./Components/Projects/ProjectsMain";
import AboutMain from "./Components/About/AboutMain";
import ContactMe from "./Components/ContactMe/ContactMe";
import MainSection from "./Components/MainSection/MainSection";
import { GithubContributions } from "react-github-graph";

import GithubCalenderSection from "./Components/GithubCalender/GithubCalender";

import MatrixCard from "matrix-card";

const Matrix = () => {
  const { isDarkMode } = useGlobalContext();
  return (
    <div
      style={{
        overflow: "hidden",
        position: "absolute",
        width: "100%",
        height: "100vh",
        zIndex: "-1",
      }}
    >
      {isDarkMode ? (
        <MatrixCard
          id={"my-id-1"}
          matrixText={" HTML Css Javascript GSAP Three Js Three Fiver Spline React JS ChartJs Tailwind Bootstrap Github Git Scss".toUpperCase()}
          delay={40}
          // backgroundColor={"rgba(42, 40, 45, 0.2)"}
          backgroundColor={"rgba(42, 40, 45, 0.2)"}
          textFontSize={"16"}
          textMainColor={"#A9A9A9"}
          textAlternateColorRatio={0.1}
          textAlternateColorList={["#808080", "#989898", "#A9A9A9", "#C0C0C0"]}
          // styleOverrideForContainerDiv={{ backgroundColor: "rgba(42, 40, 45)" }}
          // styleOverrideForCanvas={{ backgroundColor: "red" }}
          styleOverrideForChildrenDiv={{ display: "none" }}
        ></MatrixCard>
      ) : (
        <MatrixCard
          id={"my-id-2"}
          matrixText={"ANIMATE ME 2"}
          delay={100}
          backgroundColor={"rgba(0, 40, 0, 0.1)"}
          textFontSize={"16"}
          textMainColor={"#00FF00"}
          textAlternateColorRatio={0.1}
          textAlternateColorList={["#00F000", "#00EA00", "#00E000", "#00D600"]}
          // styleOverrideForCanvas={{ backgroundColor: "#00FF00" }}
          // styleOverrideForContainerDiv={{ backgroundColor: "rgba(0, 40, 0)" }}
          styleOverrideForChildrenDiv={{ display: "none" }}
        ></MatrixCard>
      )}
    </div>
  );
};

// import { useState } from "react";
// import "./Home.css";

const Home = () => {
  const { test } = useGlobalContext();
  let fontSize = "4.5rem";

  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
      <Matrix />
      <Navbar />
      <MainSection />
      <AboutMain />
      <GithubCalenderSection />
      <ProjectsMain />
      <ContactMe />
      <Footer />
    </div>
  );
};

export default Home;
