import React from "react";
import "./SubConfirmModal.css";

const SubConfirmModal = ({ isOpen, onClose, onViewDetails, message }) => {
  if (!isOpen) return null;

  return (
    <div className="subconfirm-modal-overlay">
      <div className="subconfirm-modal-content">
        <div className="subconfirm-modal-icon">
          <img
            src="/assets/images/jobs/check.png" // 아이콘 경로를 적절히 수정하세요
            alt="Success Icon"
          />
        </div>
        {/* 메시지를 props로 받아서 동적으로 표시 */}
        <div className="subconfirm-modal-text">{message}</div>
        <div className="subconfirm-modal-buttons">
          <button className="subconfirm-confirm-button" onClick={onClose}>
            확인
          </button>
          {onViewDetails && (
            <button
              className="subconfirm-view-button"
              onClick={onViewDetails} // 신청내역 보기 버튼에 콜백 함수 연결
            >
              신청내역 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubConfirmModal;
