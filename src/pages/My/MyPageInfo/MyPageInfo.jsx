// src/pages/My/MyPageInfo/MyPageInfo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageInfo.css";
import PasswordChangeModal from "../../../components/PasswordChange/PasswordChangeModal";
import ChangeConfirmModal from "../../../components/ChangeConfirm/ChangeConfirmModal";
import LoginAlertModal from "../../../components/common/LoginAlert/LoginAlertModal";

const MyPageInfo = ({ currentUser, loginState }) => {
  const navigate = useNavigate();

  // 초기 상태 설정
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    gender: "",
    address: "",
    contact: "",
    emergencyContact: "",
    disabilityType: "",
  });

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState(false);

  // `currentUser`가 업데이트될 때마다 폼 값 업데이트
  useEffect(() => {
    if (currentUser) {
      setFormValues({
        id: currentUser.id || "",
        name: currentUser.name || "",
        gender: currentUser.gender || "",
        address: currentUser.address || "",
        contact: currentUser.phone_number || "",
        emergencyContact: currentUser.emergency_phone_number || "",
        disabilityType: currentUser.disability_type
          ? currentUser.disability_type
              .map(
                (type) =>
                  `${type}: ${currentUser.disability_grade[type] || "N/A"}급`
              )
              .join(", ")
          : "",
      });
      setHeight(currentUser.height || "");
      setWeight(currentUser.weight || "");
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleHeightChange = (e) => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }
    setWeight(e.target.value);
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

    // 데이터 저장 로직 추가
    console.log({
      ...formValues,
      height,
      weight,
    });
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
          <label htmlFor="height">키</label>
          <input
            type="text"
            id="height"
            name="height"
            value={height}
            onChange={handleHeightChange}
            placeholder="키를 입력하세요 (cm)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">몸무게</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={weight}
            onChange={handleWeightChange}
            placeholder="몸무게를 입력하세요 (kg)"
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
          message="변경이 완료되었습니다."
        />
      )}

      {/* 로그인 알림 모달 */}
      {isLoginAlertModalOpen && (
        <LoginAlertModal
          isOpen={isLoginAlertModalOpen}
          onClose={() => setIsLoginAlertModalOpen(false)}
          onLoginRedirect={handleLoginRedirect}
        />
      )}
    </div>
  );
};

export default MyPageInfo;
