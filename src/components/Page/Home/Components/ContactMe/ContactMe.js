import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";

import {
  GrTwitter,
  GrFacebookOption,
  GrGithub,
  GrLinkedinOption,
} from "react-icons/gr";
import FormComponent from "./FormComponent";

const socialLinksData = [
  {
    id: 1,
    title: "Twitter",
    link: "https://twitter.com/nahean19",
    icon: <GrTwitter />,
  },
  {
    id: 2,
    title: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100088083783475",
    icon: <GrFacebookOption />,
  },
  {
    id: 3,
    title: "Github",
    link: "https://github.com/AlNahean",
    icon: <GrGithub />,
  },
  {
    id: 4,
    title: "linked In",
    link: "https://www.linkedin.com/in/nahean-fardous-30b8a9238/",
    icon: <GrLinkedinOption />,
  },
];

const contactData = [
  {
    id: 1,
    name: "+8801688961770",
    icon: <BsFillTelephoneFill />,
  },
  {
    id: 2,
    name: "nahean.fardous@gmail.com",
    icon: <MdEmail />,
  },
  {
    id: 3,
    name: "Mymensingh, Bangladesh",
    icon: <BiCurrentLocation />,
  },
];
const ContactMe = () => {
  return (
    <div className=" container contact-me-wrapper mt-5" id="contact-me">
      <div className=" row">
        <div className=" col-12 d-flex justify-content-center">
          <h1 className=" my-primary">Contact Me</h1>
        </div>
        <div className=" col-12 col-md-6 p-md-5 contact-form order-2 order-md-1 ">
          <FormComponent />
        </div>
        <div className=" col-12 col-md-6 mt-5 mt-md-0 contact-info order-1 order-md-2">
          <div className=" d-flex justify-content-center align-items-center h-100 w-100">
            <div className=" d-flex justify-content-start flex-column">
              <h1 className=" my-primary mb-4">Let's discuss your project</h1>

              {contactData.map((item) => {
                return (
                  <div
                    className=" d-flex "
                    style={{ fontSize: "1.4rem" }}
                    key={item.id}
                  >
                    <div className=" me-3 my-primary">{item.icon}</div>
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className=" row">
        <div className="w-100 d-flex justify-content-center">
          <a
            href="./Resume of Nahean Fardous-v2.pdf"
            className=" btn btn-primary m-5"
            download
          >
            Download Resume
          </a>
        </div>
      </div>
      <div className="social-section w-100">
        <h1 className=" w-100 d-flex justify-content-center">Find me on</h1>
        <p className=" d-flex justify-content-center">
          Feel free to connect with me
        </p>
        <div className=" d-flex justify-content-evenly align-items-center ">
          <div className=" d-flex">
            {/* Social Links Data */}
            {socialLinksData.map((item) => {
              return (
                <a
                  href={item.link}
                  key={item.id}
                  className="center bg-primary rounded-circle p-2 m-2 text-decoration-none text-white"
                  style={{ fontSize: "1.5rem" }}
                >
                  {item.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
