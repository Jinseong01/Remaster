// src/components/PasswordChangeModal.jsx

import React, { useState } from "react";
import "./PasswordChangeModal.css";

const PasswordChangeModal = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 변경 핸들러
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert("비밀번호가 성공적으로 변경되었습니다.");
    onClose();
  };

  return (
    <div className="pw-modal-overlay">
      <div className="pw-modal-content">
        <h2 className="pw-modal-title">비밀번호 변경</h2>
        <div className="pw-form-group">
          <label htmlFor="newPassword" className="pw-form-label">
            새 비밀번호
          </label>
          <input
            type="password"
            id="newPassword"
            className="pw-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="pw-form-group">
          <label htmlFor="confirmPassword" className="pw-form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="pw-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="pw-modal-buttons">
          <button className="pw-cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="pw-confirm-button" onClick={handlePasswordChange}>
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
