import React, { useState } from "react";
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
  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState(false);

  const navigate = useNavigate();

  // 드롭다운 토글 핸들러
  const toggleDropdown = (type) => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true); // 로그인이 안 되어 있으면 모달을 띄움
      return;
    }
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

  // "변경하기" 버튼 클릭 핸들러
  const handleChangeClick = () => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true); // 로그인이 안 되어 있으면 모달을 띄움
    }
  };

  // 렌더링할 컴포넌트를 객체로 매핑
  const renderContent = {
    정보수정: (
      <MyPageInfo
        currentUser={currentUser}
        handleChangeClick={handleChangeClick} // 변경하기 버튼 클릭 핸들러 전달
      />
    ),
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
        isOpen={isLoginAlertModalOpen}
        onClose={() => setIsLoginAlertModalOpen(false)}
        onLoginRedirect={() => navigate("/login")}
      />

      {/* 상단 드롭다운 메뉴 */}
      <div className="left-dropdown-section">
        <button
          className="mypage-dropdown-button"
          onClick={() => toggleDropdown("main")} // 드롭다운 클릭 시 로그인 상태 확인
        >
          {selectedPage}
          <ChevronDown
            className={`mypage-dropdown-icon ${
              isDropdownVisible ? "rotate" : ""
            }`}
            size={16}
          />
        </button>

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
            onClick={() => toggleDropdown("sub")} // 서브 드롭다운 클릭 시 로그인 상태 확인
          >
            {selectedSubOption}
            <ChevronDown
              className={`mypage-dropdown-icon ${
                isSubDropdownVisible ? "rotate" : ""
              }`}
              size={16}
            />
          </button>

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
