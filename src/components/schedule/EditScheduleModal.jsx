import React, { useRef, useEffect } from 'react';
//CSS
import styles from './EditScheduleModal.module.css';

const EditScheduleModal = ({ isOpen, onClose, editSchedule, selectedEvent }) => {

    const dateRef = useRef(null);
    const contentRef = useRef(null);
    const timeRef = useRef(null);

    useEffect(() => {
        if (isOpen && selectedEvent) {
            dateRef.current.value = selectedEvent.date;
            contentRef.current.value = selectedEvent.title;
            timeRef.current.value = selectedEvent.time;
        }
    }, [isOpen, selectedEvent]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        // useRef로 값을 직접 읽기
        const newSchedule = {
            ...selectedEvent,
            date: dateRef.current.value,
            content: contentRef.current.value,
            time: timeRef.current.value,
        };

        console.log(newSchedule);

        editSchedule(newSchedule);  // 부모 컴포넌트로 값 전달

        // 모달 닫기
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalClose}>
                    <button onClick={onClose}>×</button>
                </div>
                <div className={styles.modalHeader}>
                    <h2>개인일정을 수정해주세요</h2>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date">날짜</label>
                        <input type="date" ref={dateRef}/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="event">일정</label>
                        <input type="text" placeholder="일정을 입력하세요" ref={contentRef}/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="time">시간</label>
                        <input type="time" ref={timeRef}/>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.submitBtn} onClick={handleSubmit}>추가</button>
                </div>
            </div>
        </div>
    );
};

export default EditScheduleModal;
