import React from "react";
import GitHubCalendar from "react-github-calendar";

const GithubCalenderSection = () => {
  return (
    <div className=" container my-github-calender mt-5">
      <GitHubCalendar
        username="alnahean"
        color="#727cf5"
        eventHandlers={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
};

export default GithubCalenderSection;
