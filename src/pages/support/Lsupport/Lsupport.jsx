import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Lsupport.css";
import MapModal from "../Map/MapModal";
import { ChevronDown } from "lucide-react";
import LoginAlertModal from "../../../components/common/LoginAlert/LoginAlertModal";
import CompleteModal from "../../../components/common/CompleteModal/CompleteModal";

const Lsupport = ({ currentUser, loginState, setCurrentUser }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(""); // 시간을 저장하는 상태
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 확인 모달 상태
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false); // 로그인 알림 모달 상태
  const [radioSelections, setRadioSelections] = useState({
    needSignLanguage: "",
    needBathchair: "",
  });

  const handleRadioChange = (type, value) => {
    setRadioSelections((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const openStartModal = () => setIsStartModalOpen(true);
  const closeStartModal = () => setIsStartModalOpen(false);

  const handleSubmit = () => {
    if (!loginState) {
      setIsLoginAlertOpen(true); // 로그인 상태가 아니면 로그인 알림 모달 표시
      return;
    }

    const startElement = document.getElementById("address");
    const reasonElement = document.getElementById("reason");
    const allergyElement = document.getElementById("allergy");
    const petElement = document.getElementById("pet");

    if (!startElement || !reasonElement || !allergyElement || !petElement) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const start = startElement.value;
    const reason = reasonElement.value;
    const allergy = allergyElement.value;
    const pet = petElement.value;

    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    // 현재 날짜와 시간 확인
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    // 과거 날짜 및 시간 확인
    if (selectedDateTime < currentDate) {
      alert("선택한 날짜와 시간이 현재 시간보다 과거일 수 없습니다.");
      return;
    }

    const newSupport = {
      location: start,
      date: selectedDate
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "-") // 포맷 변경 (YYYY-MM-DD)
        .replace(/\.$/, ""),
      time: selectedTime,
      purpose: reason,
      alleleugi: allergy,
      pet: pet,
      need_sign_language: radioSelections.needSignLanguage === "yes",
      need_bathchair: radioSelections.needBathchair === "yes",
    };

    // currentUser의 l_support에 데이터 추가
    setCurrentUser({
      ...currentUser,
      l_support: [...(currentUser.l_support || []), newSupport],
    });

    // 확인 모달 열기
    setIsConfirmModalOpen(true);

    console.log("New Support Data:", newSupport);
    console.log("Updated l_support:", [
      ...(currentUser.l_support || []),
      newSupport,
    ]);
  };

  const handleModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleViewDetails = () => {
    navigate("/mypage/result-page/supportresult"); // /mypage로 이동
  };

  return (
    <div className="lsupport-page-container">
      <div className="lsupport-page-application-container">
        <div className="support-application-title">생활 지원 신청서</div>

        <div className="lsupport-page-form">
          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="date-picker">
              날짜
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              id="date-picker"
              className="lsupport-form-input-date"
              dateFormat="yyyy/MM/dd"
              placeholderText="날짜를 선택하세요"
            />
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="time">
              시간
            </label>
            <input
              type="time"
              id="time"
              className="lsupport-form-input-time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="address">
              장소
            </label>
            <div className="lsupport-input-with-button">
              <input
                type="text"
                id="address"
                className="lsupport-form-input-start"
                placeholder="장소를 입력하세요"
              />
              <div className="lsupport-location-icon" onClick={openStartModal}>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="reason">
              신청 사유
            </label>
            <input
              type="text"
              id="reason"
              className="lsupport-form-input-reason"
            />
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="allergy">
              알레르기
            </label>
            <input
              type="text"
              id="allergy"
              className="lsupport-form-input-allergy"
            />
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="pet">
              애완 동물
            </label>
            <input type="text" id="pet" className="lsupport-form-input-pet" />
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label">수화 사용 여부</label>
            <div className="lsupport-options-group">
              <label>
                <input
                  type="radio"
                  name="needSignLanguage"
                  value="yes"
                  checked={radioSelections.needSignLanguage === "yes"}
                  onChange={() => handleRadioChange("needSignLanguage", "yes")}
                />
                예
              </label>
              <label>
                <input
                  type="radio"
                  name="needSignLanguage"
                  value="no"
                  checked={radioSelections.needSignLanguage === "no"}
                  onChange={() => handleRadioChange("needSignLanguage", "no")}
                />
                아니오
              </label>
            </div>
          </div>

          <div className="lsupport-form-group">
            <label className="lsupport-page-label">휠체어 사용 여부</label>
            <div className="lsupport-options-group">
              <label>
                <input
                  type="radio"
                  name="needBathchair"
                  value="yes"
                  checked={radioSelections.needBathchair === "yes"}
                  onChange={() => handleRadioChange("needBathchair", "yes")}
                />
                예
              </label>
              <label>
                <input
                  type="radio"
                  name="needBathchair"
                  value="no"
                  checked={radioSelections.needBathchair === "no"}
                  onChange={() => handleRadioChange("needBathchair", "no")}
                />
                아니오
              </label>
            </div>
          </div>
        </div>

        <div className="lsupport-form-submit-container">
          <button
            className="lsupport-form-submit-button"
            onClick={handleSubmit}
          >
            신청
          </button>
        </div>
      </div>

      <MapModal
        isOpen={isStartModalOpen}
        onClose={closeStartModal}
        onSelectLocation={(address) => {
          document.getElementById("address").value = address;
          closeStartModal();
        }}
      />

      <CompleteModal
        isOpen={isConfirmModalOpen}
        onClose={handleModalClose}
        onViewHistory={handleViewDetails}
        text="신청"
      />

      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onClose={() => setIsLoginAlertOpen(false)}
        onLoginRedirect={() => navigate("/login")}
      />
    </div>
  );
};

export default Lsupport;
