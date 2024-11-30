import React from "react";
import "./SubConfirmModal.css";

const SubConfirmModal = ({ isOpen, onClose, onViewDetails }) => {
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
        <div className="subconfirm-modal-text">신청이 완료되었습니다!</div>
        <div className="subconfirm-modal-buttons">
          <button className="subconfirm-confirm-button" onClick={onClose}>
            확인
          </button>
          <button
            className="subconfirm-view-button"
            onClick={onViewDetails} // 신청내역 보기 버튼에 콜백 함수 연결
          >
            신청내역 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubConfirmModal;
