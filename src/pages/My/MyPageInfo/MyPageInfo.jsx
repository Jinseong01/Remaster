import React, { useState } from "react";
import "./MyPageInfo.css";
import PasswordChangeModal from "../../../components/PasswordChange/PasswordChangeModal";
import ChangeConfirmModal from "../../../components/ChangeConfirm/ChangeConfirmModal";
import LoginAlertModal from "../../../components/LoginAlert/LoginAlertModal";

const MyPageInfo = ({ currentUser, loginState }) => {
  const [formValues, setFormValues] = useState({
    id: currentUser.id || "",
    name: currentUser.name || "",
    gender: currentUser.gender || "",
    address: currentUser.address || "",
    contact: currentUser.phone_number || "",
    emergencyContact: currentUser.emergency_phone_number || "",
    heightWeight:
      currentUser.height && currentUser.weight
        ? `${currentUser.height}, ${currentUser.weight}`
        : "",
    disabilityType: currentUser.disability_type
      ? currentUser.disability_type.join(", ")
      : "",
    grade: currentUser.disability_grade
      ? Object.values(currentUser.disability_grade).join(", ")
      : "",
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState(false); // 로그인 모달 상태 추가

  const handleInputChange = (e) => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true); // 로그인 상태가 아니면 모달 표시
      return;
    }
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const openPasswordModal = () => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="mypage-info-container">
      {/* 입력 필드들 */}
      <form className="info-form">
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formValues.id}
            onChange={handleInputChange}
            placeholder="ID를 입력하세요"
            disabled // ID는 수정할 수 없도록 설정
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          {/* 비밀번호 변경 버튼 */}
          <button
            type="button"
            className="change-password-button"
            onClick={openPasswordModal}
          >
            비밀번호 변경
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
            placeholder="성별을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            placeholder="주소를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">연락처</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formValues.contact}
            onChange={handleInputChange}
            placeholder="연락처를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact">긴급 연락처</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={formValues.emergencyContact}
            onChange={handleInputChange}
            placeholder="긴급 연락처를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="heightWeight">키, 몸무게</label>
          <input
            type="text"
            id="heightWeight"
            name="heightWeight"
            value={formValues.heightWeight}
            onChange={handleInputChange}
            placeholder="키와 몸무게를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="disabilityType">장애 유형</label>
          <input
            type="text"
            id="disabilityType"
            name="disabilityType"
            value={formValues.disabilityType}
            onChange={handleInputChange}
            placeholder="장애 유형을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">등급</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formValues.grade}
            onChange={handleInputChange}
            placeholder="등급을 입력하세요"
          />
        </div>
      </form>

      {/* 제출 버튼 */}
      <div className="submit-section">
        <button className="submit-button" onClick={handleSubmit}>
          변경하기
        </button>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <PasswordChangeModal onClose={closePasswordModal} />
      )}

      {/* 변경 완료 모달 */}
      {isConfirmModalOpen && (
        <ChangeConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
        />
      )}

      {/* 로그인 알림 모달 */}
      {isLoginAlertModalOpen && (
        <LoginAlertModal
          isOpen={isLoginAlertModalOpen}
          onClose={() => setIsLoginAlertModalOpen(false)}
          onLoginRedirect={() => console.log("Redirect to Login Page")}
        />
      )}
    </div>
  );
};

export default MyPageInfo;
