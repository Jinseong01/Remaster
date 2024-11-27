// src/pages/MyPage/SubResultPage/SubResultPage.jsx

import React from "react";
import "./SubResultPage.css";
import ProgramResult from "./ProgramResult/ProgramResult";
import SupportResult from "./SupportResult/SupportResult";
import JobResult from "./JobResult/JobResult";

const SubResultPage = ({ selectedSubOption, currentUser, setCurrentUser }) => {
  return (
    <div className="subresult-page-container">
      {selectedSubOption === "프로그램" && (
        <ProgramResult
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {selectedSubOption === "활동보조" && (
        <SupportResult currentUser={currentUser} />
      )}
      {selectedSubOption === "일자리" && (
        <JobResult currentUser={currentUser} />
      )}
    </div>
  );
};

export default SubResultPage;
