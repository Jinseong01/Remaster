import React from "react";
import "./DuplicateApplicationDialog.css";

function DuplicateApplicationDialog({ isOpen, onClose, onViewStatus }) {
  if (!isOpen) return null;

  return (
    <div className="duplicate-dialog-overlay" onClick={onClose}>
      <div className="duplicate-dialog-wrapper" onClick={(e) => e.stopPropagation()}>
        <h2>이미 신청한 프로그램입니다.</h2>
        <div className="duplicate-dialog-buttons">
          <button className="view-status-button" onClick={onViewStatus}>
            신청 현황 보기
          </button>
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DuplicateApplicationDialog;

