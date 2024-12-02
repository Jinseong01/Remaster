import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageInfo.css";
import PasswordChangeModal from "../../../components/mypage/PasswordChange/PasswordChangeModal";
import ChangeConfirmModal from "../../../components/common/ChangeConfirm/ChangeConfirmModal";
import LoginAlertModal from "../../../components/common/LoginAlert/LoginAlertModal";

const MyPageInfo = ({ currentUser, loginState, setCurrentUser }) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (currentUser) {
      setFormValues({
        id: currentUser.id || "",
        name: currentUser.name || "",
        gender: currentUser.gender || "",
        address: currentUser.address || "",
        contact: currentUser.phone_number || "",
        emergencyContact: currentUser.emergency_phone_number || "",
        disabilityType: Object.entries(currentUser.disability_grade || {})
          .map(([type, grade]) => `${type}: ${grade}급`)
          .join(", "),
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

    if (name === "disabilityType") {
      const updatedGrades = value
        .split(",")
        .map((item) => item.trim().split(":"))
        .reduce((acc, [type, grade]) => {
          acc[type] = grade.replace("급", "").trim();
          return acc;
        }, {});
      setFormValues({
        ...formValues,
        disability_grade: updatedGrades,
      });
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginState) {
      setIsLoginAlertModalOpen(true);
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: formValues.name,
      gender: formValues.gender,
      address: formValues.address,
      phone_number: formValues.contact,
      emergency_phone_number: formValues.emergencyContact,
      disability_grade:
        formValues.disability_grade || currentUser.disability_grade,
      height,
      weight,
    };

    setCurrentUser(updatedUser); // 상위 상태 업데이트
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
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

  return (
    <div className="mypage-info-container">
      <form className="info-form">
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formValues.id}
            placeholder="ID를 입력하세요"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">키</label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={handleHeightChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">몸무게</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
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
          />
        </div>
      </form>

      <button className="submit-button" onClick={handleSubmit}>
        변경하기
      </button>

      {isPasswordModalOpen && (
        <PasswordChangeModal onClose={closePasswordModal} />
      )}
      {isConfirmModalOpen && (
        <ChangeConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={closeConfirmModal}
          message="변경이 완료되었습니다."
        />
      )}
      {isLoginAlertModalOpen && (
        <LoginAlertModal
          isOpen={isLoginAlertModalOpen}
          onClose={() => setIsLoginAlertModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyPageInfo;
