// src/pages/MyPage/MyPage.jsx

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import MyPageInfo from "./MyPageInfo/MyPageInfo";
import Timeline from "./Timeline/Timeline";
import SubResultPage from "./SubResultPage/SubResultPage";
import LoginAlertModal from "../../components/LoginAlert/LoginAlertModal";

const MyPage = ({ loginState, currentUser, setCurrentUser }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedPage, setSelectedPage] = useState("정보수정");
  const [isSubDropdownVisible, setIsSubDropdownVisible] = useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState("프로그램");

  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    if (!loginState) {
      navigate("/login");
    }
  }, [loginState, navigate]);

  // 드롭다운 토글 핸들러
  const toggleDropdown = (type) => {
    if (type === "main") {
      setIsDropdownVisible((prev) => !prev);
      setIsSubDropdownVisible(false); // 서브 드롭다운 닫기
    } else if (type === "sub") {
      setIsSubDropdownVisible((prev) => !prev);
      setIsDropdownVisible(false); // 메인 드롭다운 닫기
    }
  };

  // 드롭다운 항목 선택 핸들러
  const validPages = ["정보수정", "타임라인", "신청현황"];
  const handleSelect = (page) => {
    if (validPages.includes(page)) {
      setSelectedPage(page);
      setIsDropdownVisible(false);
    }
  };

  // 서브 드롭다운 항목 선택 핸들러
  const validSubOptions = ["프로그램", "활동보조", "일자리"];
  const handleSubSelect = (option) => {
    if (validSubOptions.includes(option)) {
      setSelectedSubOption(option);
      setIsSubDropdownVisible(false);
    }
  };

  // 렌더링할 컴포넌트를 객체로 매핑
  const renderContent = {
    정보수정: <MyPageInfo currentUser={currentUser} />,
    타임라인: <Timeline currentUser={currentUser} />,
    신청현황: (
      <SubResultPage
        selectedSubOption={selectedSubOption}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    ),
  };

  return (
    <div className="mypage-container">
      {/* 로그인 여부 확인을 위한 모달 */}
      <LoginAlertModal
        isOpen={!loginState}
        onClose={() => navigate("/login")}
      />

      {/* 상단 드롭다운 메뉴 */}
      <div className="left-dropdown-section">
        <button
          className="mypage-dropdown-button"
          onClick={() => toggleDropdown("main")}
        >
          {selectedPage}
          <ChevronDown
            className={`mypage-dropdown-icon ${
              isDropdownVisible ? "rotate" : ""
            }`}
            size={16}
          />
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownVisible && (
          <div className="mypage-dropdown-menu">
            {validPages.map((page) => (
              <div
                key={page}
                className="mypage-dropdown-item"
                onClick={() => handleSelect(page)}
              >
                {page}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 오른쪽 서브 드롭다운 메뉴 - 신청현황이 선택된 경우 표시 */}
      {selectedPage === "신청현황" && (
        <div className="right-dropdown-section">
          <button
            className="mypage-dropdown-button"
            onClick={() => toggleDropdown("sub")}
          >
            {selectedSubOption}
            <ChevronDown
              className={`mypage-dropdown-icon ${
                isSubDropdownVisible ? "rotate" : ""
              }`}
              size={16}
            />
          </button>

          {/* 서브 드롭다운 메뉴 */}
          {isSubDropdownVisible && (
            <div className="mypage-dropdown-menu">
              {validSubOptions.map((option) => (
                <div
                  key={option}
                  className="mypage-dropdown-item"
                  onClick={() => handleSubSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 선택된 페이지에 따라 다른 컴포넌트 표시 */}
      <div className="content-section">{renderContent[selectedPage]}</div>
    </div>
  );
};

export default MyPage;
