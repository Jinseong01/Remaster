import React from 'react';
//CSS
import styles from './DeleteScheduleModal.module.css';

const DeleteScheduleModal = ({ isOpen, onClose, deleteSchedule, selectedEvent }) => {
    if (!isOpen) return null;

    const handleSubmit = () => {
        deleteSchedule(selectedEvent);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalClose}>
                    <button onClick={onClose}>×</button>
                </div>
                <div className={styles.modalIcon}>
                    <img src="/assets/images/common/warning.png" alt="cursor" />
                </div>
                <input 
                    type="text"
                    className={styles.readonlyField}
                    value={`${selectedEvent.date} ${selectedEvent.time} - ${selectedEvent.title}`}
                    readOnly
                />
                <div className={styles.modalText}>
                    삭제하시겠습니까?
                </div>
                <div className={styles.modalButtons}>
                    <button className={styles.confirmButton} onClick={handleSubmit}>예</button>
                    <button className={styles.cancelButton} onClick={onClose}>아니오</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteScheduleModal;