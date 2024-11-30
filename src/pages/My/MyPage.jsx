// src/pages/My/MyPage.jsx
import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "./MyPage.css";
import LoginAlertModal from "../../components/common/LoginAlert/LoginAlertModal";

const MyPage = ({ loginState, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] =
    React.useState(false);
  const [isSubDropdownVisible, setIsSubDropdownVisible] = React.useState(false);

  const dropdownRef = useRef(null);
  const subDropdownRef = useRef(null);

  // 현재 경로를 기반으로 선택된 페이지를 결정
  const determineSelectedPage = () => {
    const path = location.pathname;
    if (path === "/mypage") return "정보수정";
    if (path.startsWith("/mypage/timeline")) return "타임라인";
    if (path.startsWith("/mypage/result-page")) return "신청현황";
    // "프로필"과 "설정" 항목 제거
    return "정보수정";
  };

  const selectedPage = determineSelectedPage();

  // 드롭다운 메뉴 토글 핸들러
  const toggleDropdown = () => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    setIsDropdownVisible((prev) => !prev);
  };

  // 드롭다운 항목 선택 핸들러
  const handleSelect = (page) => {
    setIsDropdownVisible(false);
    setIsSubDropdownVisible(false); // 서브 드롭다운 숨기기
    switch (page) {
      case "정보수정":
        navigate("/mypage");
        break;
      case "타임라인":
        navigate("/mypage/timeline");
        break;
      case "신청현황":
        navigate("/mypage/result-page/programresult"); // 기본 서브 경로로 이동
        break;
      default:
        navigate("/mypage");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // 신청현황 서브 드롭다운 토글 핸들러
  const toggleSubDropdown = () => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    setIsSubDropdownVisible((prev) => !prev);
  };

  // 신청현황 서브 드롭다운 항목 선택 핸들러
  const handleSubSelect = (option) => {
    setIsSubDropdownVisible(false);
    switch (option) {
      case "프로그램":
        navigate("result-page/programresult");
        break;
      case "활동보조":
        navigate("result-page/supportresult");
        break;
      case "일자리":
        navigate("result-page/jobresult");
        break;
      default:
        navigate("result-page/programresult");
    }
  };

  // 클릭 외부 시 드롭다운 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
      if (
        subDropdownRef.current &&
        !subDropdownRef.current.contains(event.target)
      ) {
        setIsSubDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 신청현황 서브 옵션을 결정하는 함수
  const determineSubOption = () => {
    const path = window.location.pathname;
    if (path.endsWith("/programresult")) return "프로그램";
    if (path.endsWith("/supportresult")) return "활동보조";
    if (path.endsWith("/jobresult")) return "일자리";
    return "프로그램";
  };

  return (
    <div className="mypage-container">
      {/* 로그인 여부 확인을 위한 모달 */}
      <LoginAlertModal
        isOpen={isLoginAlertModalOpen}
        onClose={() => setIsLoginAlertModalOpen(false)}
        onLoginRedirect={handleLoginRedirect}
      />

      {/* 드롭다운 메뉴 */}
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className="mypage-dropdown-button"
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={isDropdownVisible}
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
            {["정보수정", "타임라인", "신청현황"].map((page) => (
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

      {/* 신청현황 서브 드롭다운 메뉴 */}
      {selectedPage === "신청현황" && (
        <div className="sub-dropdown-container" ref={subDropdownRef}>
          <button
            className="mypage-dropdown-button"
            onClick={toggleSubDropdown}
            aria-haspopup="menu"
            aria-expanded={isSubDropdownVisible}
          >
            {determineSubOption()}
            <ChevronDown
              className={`mypage-dropdown-icon ${
                isSubDropdownVisible ? "rotate" : ""
              }`}
              size={16}
            />
          </button>

          {isSubDropdownVisible && (
            <div className="mypage-dropdown-menu">
              {["프로그램", "활동보조", "일자리"].map((option) => (
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

      {/* 하위 라우트를 렌더링 */}
      <div className="content-section">
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
