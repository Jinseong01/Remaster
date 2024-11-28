// src/components/CancelConfirmModal.jsx

import React from "react";
import "./CancelConfirmModal.css";

const CancelConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 모달 아이콘 */}
        <div className="modal-icon">
          <img src="/assets/images/jobs/click.png" alt="Confirm Icon" />
        </div>

        {/* 지원 문구 */}
        <div className="modal-text">정말로 취소하시겠습니까?</div>

        {/* 예/아니오 버튼 */}
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            아니오
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmModal;
