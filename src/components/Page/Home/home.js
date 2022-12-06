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

// import { useState } from "react";
// import "./Home.css";

const Home = () => {
  const { test } = useGlobalContext();
  let fontSize = "4.5rem";

  return (
    <div>
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
