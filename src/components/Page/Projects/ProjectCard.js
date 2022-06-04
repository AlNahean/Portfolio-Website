import React from "react";

const ProjectCard = ({ item }) => {
  let { id, title, descreption, img, link } = item;
  return (
    <>
      <div className=" col-12 col-md-6 col-xl-4 ">
        <div
          className="  card project-card single-project"
          style={{ backgroundColor: "transparent" }}
        >
          <div className=" card-body">
            <img
              src={`${img}?${global.Date.now()}`}
              alt="projectImage"
              className=" w-100 image"
            />
            <h4 className="title w-100 text-center">{title}</h4>
            <p className=" descreption text-center">{descreption}</p>
            <div className=" d-flex justify-content-center">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className=" btn btn-primary"
              >
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
