import React from "react";
// CSS
import styles from "./CompleteModal.module.css";

const CompleteModal = ({ isOpen, onClose, onViewHistory }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalClose}>
          <button onClick={onClose}>×</button>
        </div>
        <div className={styles.modalIcon}>
          <img src="/assets/images/jobs/check.png" alt="cursor" />
        </div>
        <div className={styles.modalText}>
          지원이 완료되었습니다
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.confirmButton} onClick={onClose}>확인</button>
          <button className={styles.historyButton} onClick={onViewHistory}>지원내역</button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
