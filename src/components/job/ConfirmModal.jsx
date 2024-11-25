import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-close">
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-icon">
          <img src="/assets/images/jobs/click.png" alt="cursor" />
        </div>
        <div className="modal-text">
          지원하시겠습니까?
        </div>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>예</button>
          <button className="cancel-button" onClick={onClose}>아니오</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;