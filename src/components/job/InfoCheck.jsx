import React from 'react';
import { useNavigate } from 'react-router-dom';
//컴포넌트
import ConfirmModal from './ConfirmModal';
//CSS
import styles from './InfoCheck.module.css'

const InfoCheck = ({ onBack, onOpenModal, isModalOpen, onCloseModal, onConfirm, currentUser, loginState }) => {
    const navigate = useNavigate();

    if (!loginState) {
        return (
            <div className={styles.loginRequiredContainer}>
                <div className={styles.loginRequiredContent}>
                    <i className={styles.loginIcon}></i>
                    <h2>로그인이 필요합니다</h2>
                    <p>이 서비스를 이용하려면 로그인이 필요합니다.</p>
                    <div className={styles.loginButtons}>
                        <button className={styles.loginButton} onClick={() => {navigate(`/login`)}}>
                            로그인하기
                        </button>
                        <div className={styles.buttonContainer}>
                            <button className={styles.previousButton} onClick={onBack}>이전</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  
    return (
      <>
          <div className={styles.infoCheck}>
              <div className={styles.infoCheckRow}>
                  <label>이름</label>
                  <input type="text" value={currentUser.name} disabled/>
  
                  <label>성별</label>
                  <div className={styles.radioGroup}>
                      <label htmlFor="male">남성</label>
                      <input type="radio" id="male" name="gender" value="남" checked={currentUser.gender === '남'} disabled/>
  
                      <label htmlFor="female">여성</label>
                      <input type="radio" id="female" name="gender" value="여" checked={currentUser.gender === '여'} disabled/>
                  </div>
              </div>
  
              <label>전화번호</label>
              <input type="tel" value={currentUser.phone_number} disabled/>
              
              <label>비상연락처</label>
              <input type="tel" value={currentUser.emergency_phone_number} disabled/>
  
              <label>주소</label>
              <input type="text" value={currentUser.address} disabled/>
  
              <label>장애종류-장애등급</label>
              {currentUser.disability_type.map((type, index) => (
                  <div key={index} className={styles.disabilityRow}>
                      <input type="text" value={type} disabled/>
                      <span>-</span>
                      <input type="text" value={currentUser.disability_grade[type]} disabled/>
                  </div>
              ))}
          </div>
  
          <div className={styles.buttonContainer}>
              <button className={styles.previousButton} onClick={onBack}>이전</button>
              <button className={styles.submitButton} onClick={onOpenModal}>지원</button>
          </div>
          
          <ConfirmModal 
              isOpen={isModalOpen}
              onClose={onCloseModal}
              onConfirm={onConfirm}
          />
      </>
    );
};

export default InfoCheck;