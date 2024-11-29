import React from "react";
import "./CompletionDialog.css";

function CompletionDialog({ isOpen, onClose, onViewHistory }) {
  if (!isOpen) return null;

  return (
    <div className="check-dialog-overlay-completion" onClick={onClose}>
      <div className="check-dialog-wrapper-completion" onClick={(e) => e.stopPropagation()}>
        <img src="/assets/images/jobs/check.png" alt="Check Icon" />
        <h2>신청이 완료되었습니다</h2>
        <div className="check-dialog-buttons-completion">
          <button className="check-dialog-confirm-completion" onClick={onClose}>
            확인
          </button>
          <button className="check-dialog-view-history-completion" onClick={onViewHistory}>
            신청내역 보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletionDialog;
