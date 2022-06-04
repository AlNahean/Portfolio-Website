import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home/home";
import Error from "./Page/Error/Error";
import About from "./Page/About/About";
import Projects from "./Page/Projects/Projects";
import Resume from "./Page/Resume/Resume";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={<Home />} />
        <Route path="/home" caseSensitive={false} element={<Home />} />
        <Route path="/about" caseSensitive={false} element={<About />} />
        <Route path="/projects" caseSensitive={false} element={<Projects />} />
        <Route path="/resume" caseSensitive={false} element={<Resume />} />
        <Route path="*" caseSensitive={false} element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Routing;
