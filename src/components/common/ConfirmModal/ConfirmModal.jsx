import React from 'react';
// CSS
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ text, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalClose}>
          <button onClick={onClose}>×</button>
        </div>
        <div className={styles.modalIcon}>
          <img src="/assets/images/common/click.png" alt="cursor" />
        </div>
        <div className={styles.modalText}>
          {`${text}하시겠습니까?`}
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.confirmButton} onClick={onConfirm}>예</button>
          <button className={styles.cancelButton} onClick={onClose}>아니오</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
