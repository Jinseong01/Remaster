import React from 'react';
import ConfirmModal from './ConfirmModal';
import './InfoCheck.css'
import { useNavigate } from 'react-router-dom';

const InfoCheck = ({ onBack, onOpenModal, isModalOpen, onCloseModal, onConfirm, currentUser, loginState }) => {
    const navigate = useNavigate();

    if (!loginState) {
        return (
            <div className="login-required-container">
                <div className="login-required-content">
                    <i className="fas fa-lock login-icon"></i> {/* Font Awesome 아이콘 사용 */}
                    <h2>로그인이 필요합니다</h2>
                    <p>이 서비스를 이용하려면 로그인이 필요합니다.</p>
                    <div className="login-buttons">
                        <button className="login-button" onClick={() => {navigate(`/login`)}}>
                            로그인하기
                        </button>
                        <div className="button-container">
                            <button className="previous-button" onClick={onBack}>이전</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  
    return (
      <>
          <div className="info-check">
              <div className="info-check-row">
                  <label>이름</label>
                  <input type="text" value={currentUser.name} disabled/>
  
                  <label>성별</label>
                  <div className="radio-group">
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
                  <div key={index} className="disability-row">
                      <input type="text" value={type} disabled/>
                      <span>-</span>
                      <input type="text" value={currentUser.disability_grade[type]} disabled/>
                  </div>
              ))}
          </div>
  
          <div className="button-container">
              <button className="previous-button" onClick={onBack}>이전</button>
              <button className="submit-button" onClick={onOpenModal}>지원</button>
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
