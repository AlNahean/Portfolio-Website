import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectCardData = [
  {
    id: 1,
    title: " Admin Dashboard",
    descreption:
      "This is a admin dashboard developed using React. It can switch Between Darkmode and Light mode. I used Chart js To create graph here",
    img: "./projects/hyper admin dashboard.png",
    link: "https://admin-dashboard-react-chartjs.netlify.app/e-commerse",
  },
  {
    id: 2,
    title: "Portfolio Wibsite",
    descreption:
      "This is my portfolio website. I used React to build this project. It can switch between dark mode and light mode",
    img: "./projects/portfolio website.png",
    link: "https://nahean.netlify.app/",
  },
  {
    id: 3,
    title: "Ecommerese Daraz clone",
    descreption:
      "This is a E-commerse website. This includes both frontend and backend. I used React in frontend and used Node Js to develope the backend ",
    img: "./projects/daraz clone.png",
    link: "https://ecommerce-clone-daraz.netlify.app/",
  },
  {
    id: 4,
    title: "Rick and Morty Wiki",
    descreption:
      "This is a frot-end project on top of rick-and-morty api. This can show all characters and search indivisual character.",
    img: "./projects/rick-and-morty.png",
    link: "https://rick-and-morty-wiikii.netlify.app/",
  },
  {
    id: 5,
    title: "Phoenix Clone",
    descreption:
      "This is a agency website built with React and bootstrap. It can switch between dark and light mode ",
    img: "./projects/phoenix-clone.png",
    link: "https://phoenix-clone.netlify.app/",
  },
];

const ProjectsMain = () => {
  return (
    <main className=" container projects-wrapper aaaaa" id="projects">
      <div className=" project-page-heading-wrapper row">
        <h1 className=" col-12 text-center">
          My <span className=" my-primary">Recent Works</span>
        </h1>
        <p className=" col-12 text-center">
          Here are a few projects I've worked on recently.
        </p>
      </div>
      <div className="projets-showcase-container row  justify-content-center g-3">
        {ProjectCardData.map((item) => {
          return <ProjectCard item={item} key={item.id} />;
        })}
      </div>
    </main>
  );
};

export default ProjectsMain;
