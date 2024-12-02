// src/pages/MyPage/SupportPage.jsx
import React, { useState } from "react";
import Lsupport from "./Lsupport/Lsupport";
import Tsupport from "./Tsupport/Tsupport";
import "./SupportPage.css";

const SupportPage = ({ currentUser, loginState, setCurrentUser }) => {
  const [currentPage, setCurrentPage] = useState("livingSupport");
  console.log(currentUser);
  console.log(loginState);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="support-page-container">
      {/* 페이지 전환 버튼 */}
      <div className="support-page-buttons">
        <button
          className={`support-page-button ${
            currentPage === "livingSupport" ? "active" : ""
          }`}
          onClick={() => handlePageChange("livingSupport")}
        >
          생활 지원
        </button>
        <button
          className={`support-page-button ${
            currentPage === "moveSupport" ? "active" : ""
          }`}
          onClick={() => handlePageChange("moveSupport")}
        >
          이동 지원
        </button>
      </div>

      {/* 현재 페이지 렌더링 */}
      <div className="support-page-content">
        {currentPage === "moveSupport" && (
          <Tsupport
            currentUser={currentUser}
            loginState={loginState}
            setCurrentUser={setCurrentUser}
          />
        )}
        {currentPage === "livingSupport" && (
          <Lsupport
            currentUser={currentUser}
            loginState={loginState}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </div>
  );
};

export default SupportPage;
