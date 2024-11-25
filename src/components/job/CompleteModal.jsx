import React from "react";
import './CompleteModal.css'

const CompleteModal = ({ isOpen, onClose, onViewHistory }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-close">
            <button onClick={onClose}>×</button>
          </div>
          <div className="modal-icon">
            <img src="/assets/images/jobs/check.png" alt="cursor" />
          </div>
          <div className="modal-text">
            지원이 완료되었습니다
          </div>
          <div className="modal-buttons">
            <button className="confirm-button" onClick={onClose}>확인</button>
            <button className="history-button" onClick={onViewHistory}>지원내역</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CompleteModal;