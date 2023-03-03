import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import { BsBoxArrowUpRight, BsGithub } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";

const ProjectCard = ({ item }) => {
  let { id, title, descreption, img, link, github } = item;
  return (
    <>
      <div className=" col-12 col-md-6 col-xl-4 ">
        <div
          className="  card project-card single-project"
          style={{ backgroundColor: "transparent" }}
        >
          <div className=" card-body">
            <HoverVideoPlayer
              className="  w-100"
              videoSrc={item.video}
              pausedOverlay={
                <img
                  className="w-100 "
                  src={img}
                  alt=""
                  style={{
                    // Make the image expand to cover the video's dimensions
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    // flex: 1,
                  }}
                />
              }
              loadingOverlay={
                <div className="loading-overlay">
                  <div className="loading-spinner" />
                </div>
              }
            />
            {/* <img
              src={img}
              // src={`${img}?${global.Date.now()}`}
              alt="projectImage"
              className=" w-100 image"
            /> */}
            <h4 className="title w-100 text-center">{title}</h4>
            <p className=" descreption text-center">{descreption}</p>
            <div className=" d-flex justify-content-center gap-2">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className=" btn btn-primary d-flex gap-2 align-items-center"
                >
                  <h5 className=" mb-0 mt-1">Live</h5>
                  <BsBoxArrowUpRight fontSize="1.3rem" />
                </a>
              )}

              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className=" btn btn-primary d-flex gap-2 align-items-center"
                >
                  <h5 className=" mb-0 mt-1">Code</h5>
                  <div className="">
                    <BsGithub fontSize="1.4rem" />
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
