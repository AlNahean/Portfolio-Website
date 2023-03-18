import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectCardData = [
  {
    id: 1,
    title: " Admin Dashboard",
    descreption:
      "This is a admin dashboard developed using React. It can switch Between Darkmode and Light mode. I used Chart js To create graph here",
    img: "./projects/compressed/hyper admin dashboard_result.webp",
    video: "./projects/video/2023-02-18 10-06-24.mp4",
    link: "https://admin-dashboard-react-chartjs.netlify.app/e-commerse",
    github: "https://github.com/AlNahean/Admin-Dashboard",
  },
  {
    id: 2,
    title: "Portfolio Wibsite",
    descreption:
      "This is my portfolio website. I used React to build this project. It can switch between dark mode and light mode",
    img: "./projects/compressed/portfolio website_result.webp",
    video: "./projects/video/",

    link: "https://nahean.netlify.app/",
    github: "https://github.com/AlNahean/Portfolio-Website",
  },
  {
    id: 3,
    title: "Ecommerese Daraz clone",
    descreption:
      "This is a E-commerse website. This includes both frontend and backend. I used React in frontend and used Node Js to develope the backend ",
    img: "./projects/compressed/daraz clone_result.webp",
    video: "./projects/video/2022-04-20 14-24-43.mp4",

    link: "https://ecommerce-clone-daraz.netlify.app/",
    github: "https://github.com/AlNahean/daraz-clone-client",
  },
  {
    id: 4,
    title: "Rick and Morty Wiki",
    descreption:
      "This is a frot-end project on top of rick-and-morty api. This can show all characters and search indivisual character.",
    img: "./projects/compressed/rick-and-morty_result.webp",
    video: "./projects/video/React App (2).mp4",

    link: "https://rick-and-morty-wiikii.netlify.app/",
    github: "https://github.com/AlNahean/rick-and-morty",
  },
  {
    id: 5,
    title: "Phoenix Clone",
    descreption:
      "This is a agency website built with React and bootstrap. It can switch between dark and light mode ",
    img: "./projects/compressed/phoenix-clone_result.webp",
    video: "./projects/video/React App.mp4",

    link: "https://phoenix-clone.netlify.app/",
    github: "https://github.com/AlNahean/phoenix-landing-page",
  },
  {
    id: 6,
    title: "Ai Image Generator",
    descreption:
      "This is a project to turn text into images. With a text prompt it will generate a image based on the prompt ",
    img: "./projects/compressed/image-generator_result.webp",
    video: "./projects/video/",

    link: "https://openaiapi.vercel.app/openai/generate-image",
    github: "https://github.com/AlNahean/openaiapi ",
  },
  {
    id: 7,
    title: "Ai Text Generator",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/text-generator_result.webp",
    video: "./projects/video/",

    link: "https://openaiapi.vercel.app/openai/text-completion",
    github: "https://github.com/AlNahean/openaiapi ",
  },
  {
    id: 8,
    title: "Casio Slider",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_casio-slider_result.webp",
    video: "./projects/video/Localhost 3000 Casio-Slider.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/casio-slider",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 9,
    title: "Discover World",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_discover-world_result.webp",
    video: "./projects/video/Localhost 3000 Discover-World.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/discover-world",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 10,
    title: "Grid Website",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_grid-website_result.webp",
    video: "./projects/video/Localhost 3000 Grid-Website.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/grid-website",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 11,
    title: "Netflix Redisign",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_home_result.webp",
    video: "./projects/video/Localhost 3000 Home.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/netflix-redesign",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 12,
    title: "Instagram Redesign",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_instagram-redesign_result.webp",
    video: "./projects/video/Localhost 3000 Instagram-Redesign.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/instagram-redesign",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 13,
    title: "Knives Slider",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_knives-slider_result.webp",
    video: "./projects/video/Localhost 3000 Knives-Slider.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/knives-slider",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 14,
    title: "Shoe Showcase",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_shoe-showcase_result.webp",
    video: "./projects/video/Localhost 3000 Shoe-Showcase.mp4",
    link: "https://next-js-projects-pf8p.vercel.app/shoe-showcase",
    github: "https://github.com/AlNahean/next-js-projects",
  },
  {
    id: 15,
    title: "Tasky",
    descreption:
      "Based on your prompt or question it will try to generate an answer.",
    img: "./projects/compressed/localhost_3000_tasky (1)_result.webp",
    video:
      "./projects/video/Https   Next-Js-Projects-Pf8p.Vercel.App Tasky.mp4",

    link: "https://next-js-projects-pf8p.vercel.app/tasky",
    github: "https://github.com/AlNahean/next-js-projects",
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
