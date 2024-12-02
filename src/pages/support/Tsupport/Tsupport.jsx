import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Tsupport.css";
import MapModal from "../Map/MapModal";
import { ChevronDown } from "lucide-react";
import CompleteModal from "../../../components/common/CompleteModal/CompleteModal";
import LoginAlertModal from "../../../components/common/LoginAlert/LoginAlertModal";
const Tsupport = ({ currentUser, loginState, setCurrentUser }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [purpose, setPurpose] = useState(""); // 목적 상태 추가
  const [startLocation, setStartLocation] = useState(""); // 출발지 상태 추가
  const [destination, setDestination] = useState(""); // 목적지 상태 추가
  const [transportation, setTransportation] = useState(""); // 이동 수단 상태 추가
  const [isStartModalOpen, setIsStartModalOpen] = useState(false); // 출발지 모달 상태
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false); // 목적지 모달 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [radioSelections, setRadioSelections] = useState({
    needSignLanguage: "",
    needBathchair: "",
    needReturn: "",
  });

  const handleRadioChange = (type, value) => {
    setRadioSelections((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const openStartModal = () => setIsStartModalOpen(true);
  const closeStartModal = () => setIsStartModalOpen(false);

  const openDestinationModal = () => setIsDestinationModalOpen(true);
  const closeDestinationModal = () => setIsDestinationModalOpen(false);

  const handleSubmit = () => {
    if (!loginState) {
      setIsLoginAlertOpen(true);
      return;
    }

    // 현재 날짜와 시간 가져오기
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);

    // 시간 추가
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      selectedDateTime.setHours(hours, minutes, 0, 0);
    }

    // 과거 시간 체크
    if (selectedDateTime < currentDate) {
      alert("선택한 날짜와 시간이 현재 시간보다 과거일 수 없습니다.");
      return;
    }

    // 필수값 확인
    if (
      !purpose ||
      !startLocation ||
      !destination ||
      !transportation ||
      !selectedDate ||
      !selectedTime
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 새로운 이동 지원 데이터 생성
    const newSupport = {
      departure_location: startLocation,
      destination: destination,
      date: selectedDate
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "-") // 포맷 변경 (YYYY-MM-DD)
        .replace(/\.$/, ""),
      time: selectedTime,
      purpose: purpose,
      vehicle: transportation,
      need_for_return: radioSelections.needReturn === "yes",
      need_sign_language: radioSelections.needSignLanguage === "yes",
      need_bathchair: radioSelections.needBathchair === "yes",
    };

    // currentUser의 t_support 업데이트
    setCurrentUser({
      ...currentUser,
      t_support: [...(currentUser.t_support || []), newSupport],
    });

    setIsConfirmModalOpen(true);
  };

  const handleModalClose = () => setIsConfirmModalOpen(false);

  const handleViewDetails = () => navigate("/mypage/result-page/supportresult");

  return (
    <div className="tsupport-page-container">
      <div className="tsupport-page-application-container">
        <div className="support-application-title">이동 지원 신청서</div>
        <div className="tsupport-page-form">
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">날짜</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="tsupport-form-input-date"
              dateFormat="yyyy/MM/dd"
              placeholderText="날짜를 선택하세요"
            />
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">시간</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="tsupport-form-input-time"
            />
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">출발지</label>
            <div className="tsupport-input-with-button">
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="tsupport-form-input"
                placeholder="출발지를 입력하세요"
              />
              <div className="tsupport-location-icon" onClick={openStartModal}>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">목적지</label>
            <div className="tsupport-input-with-button">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="tsupport-form-input"
                placeholder="목적지를 입력하세요"
              />
              <div
                className="tsupport-location-icon"
                onClick={openDestinationModal}
              >
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">목적</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="tsupport-form-input"
              placeholder="목적을 입력하세요"
            />
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">이동 수단</label>
            <input
              type="text"
              value={transportation}
              onChange={(e) => setTransportation(e.target.value)}
              className="tsupport-form-input"
              placeholder="이동 수단을 입력하세요"
            />
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">복귀 여부</label>
            <div className="tsupport-options-group">
              <label>
                <input
                  type="radio"
                  name="needReturn"
                  value="yes"
                  checked={radioSelections.needReturn === "yes"}
                  onChange={() => handleRadioChange("needReturn", "yes")}
                />
                예
              </label>
              <label>
                <input
                  type="radio"
                  name="needReturn"
                  value="no"
                  checked={radioSelections.needReturn === "no"}
                  onChange={() => handleRadioChange("needReturn", "no")}
                />
                아니오
              </label>
            </div>
          </div>
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">수화 사용 여부</label>
            <div className="tsupport-options-group">
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
          <div className="tsupport-form-group">
            <label className="tsupport-page-label">휠체어 사용 여부</label>
            <div className="tsupport-options-group">
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
          <div className="tsupport-form-submit-container">
            <button
              className="tsupport-form-submit-button"
              onClick={handleSubmit}
            >
              신청
            </button>
          </div>
        </div>
      </div>
      <MapModal
        isOpen={isStartModalOpen}
        onClose={closeStartModal}
        onSelectLocation={(location) => {
          setStartLocation(location);
          closeStartModal();
        }}
      />
      <MapModal
        isOpen={isDestinationModalOpen}
        onClose={closeDestinationModal}
        onSelectLocation={(location) => {
          setDestination(location);
          closeDestinationModal();
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

export default Tsupport;
