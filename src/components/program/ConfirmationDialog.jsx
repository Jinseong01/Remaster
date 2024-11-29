import React from "react";
import "./ConfirmationDialog.css";

function ConfirmationDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="check-dialog-overlay-confirmation" onClick={onClose}>
      <div className="check-dialog-wrapper-confirmation" onClick={(e) => e.stopPropagation()}>
        <h2>신청하시겠습니까?</h2>
        <div className="check-dialog-buttons-confirmation">
          <button className="check-dialog-yes-confirmation" onClick={onConfirm}>
            네
          </button>
          <button className="check-dialog-no-confirmation" onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
