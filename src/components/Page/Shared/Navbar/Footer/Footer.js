import React from "react";
import {
  GrTwitter,
  GrFacebookOption,
  GrGithub,
  GrLinkedinOption,
} from "react-icons/gr";
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
const Footer = () => {
  return (
    <>
      <footer
        className=" p-2 mt-2 "
        style={{
          //   backgroundColor: "#6C63FF",
          //   backgroundColor: "#000000",
          backgroundColor: "#00000094",
          //   backgroundColor: "#3F3D56",
        }}
      >
        <div className=" container">
          <div className=" d-flex flex-md-row flex-column justify-content-md-between justify-content-center align-items-center m-5">
            <h5>Developed by Nahean</h5>
            <p className=" mb-0">Copyright © 2022</p>
            <div className=" d-flex">
              {socialLinksData.map((item) => {
                return (
                  <a
                    href={item.link}
                    key={item.id}
                    className="center bg-primary rounded-circle p-2 m-2 text-decoration-none text-white"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
