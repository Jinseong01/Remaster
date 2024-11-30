import React from 'react';
// CSS
import styles from './DuplicateModal.module.css';

const DuplicateModal = ({ text, isOpen, onClose, onRedirect }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalClose}>
          <button onClick={onClose}>×</button>
        </div>
        <div className={styles.modalIcon}>
          <img src="/assets/images/common/warning.png" alt="cursor" />
        </div>
        <div className={styles.modalText}>
          {`이미 ${text}하였습니다`}
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.mypageButton} onClick={onRedirect}>{`${text}내역`}</button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateModal;
