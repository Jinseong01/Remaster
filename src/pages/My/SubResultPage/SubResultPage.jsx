import React from "react";
import { Outlet } from "react-router-dom";
import "./SubResultPage.css";
import LoginAlertModal from "../../../components/common/LoginAlert/LoginAlertModal";

const SubResultPage = () => {
  return (
    <div className="subresult-page-container">
      {/* 로그인 여부 확인을 위한 모달 */}
      <LoginAlertModal
        isOpen={false} // 항상 false로 설정 (여기서는 로그인 확인 로직 필요 없음)
        onClose={() => {}}
        onLoginRedirect={() => {}}
      />

      {/* 하위 라우트를 렌더링 */}
      <div className="subresult-content-section">
        <Outlet />
      </div>
    </div>
  );
};

export default SubResultPage;
