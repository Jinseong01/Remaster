import React from "react";
import "./ChangeConfirmModal.css";

const ChangeConfirmModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 모달 아이콘 */}
        <div className="modal-icon">
          <img src="/assets/images/common/check.png" alt="Check Icon" />
        </div>

        {/* 메시지 */}
        <div className="modal-text">{message}</div>

        {/* 확인 버튼 */}
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeConfirmModal;
