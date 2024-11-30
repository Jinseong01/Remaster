// src/components/LoginAlertModal.jsx

import React from "react";
import "./LoginAlertModal.css";
import { useNavigate } from "react-router-dom";

const LoginAlertModal = ({ isOpen, onClose, onLoginRedirect }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleClose = () => {
    onClose(); // 기존에 닫는 기능도 수행하고
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <div className="login-alert-modal-overlay">
      <div className="login-alert-modal-content">
        {/* 모달 아이콘 */}
        <div className="login-alert-modal-icon">
          <img src="/assets/images/jobs/click.png" alt="Login Icon" />
        </div>

        {/* 지원 문구 */}
        <div className="login-alert-modal-text">로그인이 필요합니다</div>
        <p>이 서비스를 이용하기 위해서는 로그인이 필요합니다.</p>

        {/* 예/아니오 버튼 */}
        <div className="login-alert-modal-buttons">
          <button className="login-alert-cancel-button" onClick={handleClose}>
            닫기
          </button>
          <button
            className="login-alert-confirm-button"
            onClick={onLoginRedirect}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlertModal;
