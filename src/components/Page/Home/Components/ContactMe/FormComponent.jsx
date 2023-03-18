import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useSnackbar } from "react-simple-snackbar";
const options = {
  position: "bottom-right",
  style: {
    backgroundColor: "white",
    border: "1px solid black",
    color: "black",
    // fontFamily: "Menlo, monospace",
    fontSize: "20px",
    textAlign: "center",
  },
  closeStyle: {
    color: "red",
    fontSize: "16px",
  },
};

const templateParams = {
  name: "James",
  notes: "Check this out!",
};
const FormComponent = () => {
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [contactFormInfo, setContactFormInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const onChangeHandler = (type, value) => {
    if (type === "name") {
      setContactFormInfo({ ...contactFormInfo, name: value });
      return;
    }
    if (type === "email") {
      setContactFormInfo({ ...contactFormInfo, email: value });
      return;
    }
    if (type === "phone") {
      setContactFormInfo({ ...contactFormInfo, phone: value });
      return;
    }
    if (type === "message") {
      setContactFormInfo({ ...contactFormInfo, message: value });
      return;
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e, contactFormInfo);

    emailjs
      .send(
        "service_iuy9311",
        "template_i1t4wrd",
        contactFormInfo,
        "1RRTW8OMTVf8n97gB"
      )
      .then(
        (response) => {
          openSnackbar("Message sent successfully");
        },
        (err) => {
          //   console.log("FAILED...", err);
          openSnackbar("Something Went Wrong");
        }
      );

    setContactFormInfo({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  return (
    <div>
      <form
        className=" contact-form"
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <input
          value={contactFormInfo.name}
          type="text"
          required
          className=" form-control mt-3 mb-3 form-input"
          placeholder="name"
          onChange={(e) => {
            onChangeHandler("name", e.target.value);
          }}
        />
        <input
          value={contactFormInfo.email}
          type="email"
          className=" form-control form-input mt-3 mb-3"
          placeholder="email"
          required
          onChange={(e) => {
            onChangeHandler("email", e.target.value);
          }}
        />
        <input
          value={contactFormInfo.phone}
          type="tel"
          className=" form-control form-input mt-3 mb-3"
          placeholder="phone"
          //   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          required
          onChange={(e) => {
            onChangeHandler("phone", e.target.value);
          }}
        />

        <textarea
          value={contactFormInfo.message}
          name="message"
          cols="10"
          rows="5"
          className=" form-control form-input mt-3 mb-3"
          placeholder="message"
          required
          onChange={(e) => {
            onChangeHandler("message", e.target.value);
          }}
        ></textarea>

        <button className=" btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
