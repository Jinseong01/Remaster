import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Tsupport.css";
import MapModal from "../Map/MapModal";
import SubConfirmModal from "../../../components/SubConfirm/SubConfirmModal";

import { ChevronDown } from "lucide-react";
import TsupportData from "../../../data/Tsupport";
import LoginAlertModal from "../../../components/LoginAlert/LoginAlertModal";
const Tsupport = ({ currentUser, loginState, setCurrentUser }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false); // 로그인 알림 모달 상태 추가
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
      setIsLoginAlertOpen(true); // 로그인 상태가 아니면 로그인 알림 모달 표시
      return;
    }

    const startElement = document.getElementById("start");
    const destinationElement = document.getElementById("destination");
    const transportationElement = document.getElementById("transportation");

    if (!startElement || !destinationElement || !transportationElement) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const start = startElement.value;
    const destination = destinationElement.value;
    const transportation = transportationElement.value;

    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    const newSupport = {
      departure_location: start,
      destination: destination,
      date: selectedDate
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "/")
        .replace(/\./, ""),
      time: selectedTime,
      vehicle: transportation,
      need_for_return: radioSelections.needReturn === "yes",
      need_sign_language: radioSelections.needSignLanguage === "yes",
      need_bathchair: radioSelections.needBathchair === "yes",
    };

    TsupportData.push(newSupport);

    setCurrentUser({
      ...currentUser,
      t_support: [...(currentUser.t_support || []), newSupport],
    });

    setIsConfirmModalOpen(true);
  };

  const handleModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleViewDetails = () => {
    navigate("/mypage"); // /mypage로 이동
  };

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
                id="start"
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
                id="destination"
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
            <label className="tsupport-page-label">이동 수단</label>
            <input
              type="text"
              id="transportation"
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
          document.getElementById("start").value = location;
          closeStartModal();
        }}
      />
      <MapModal
        isOpen={isDestinationModalOpen}
        onClose={closeDestinationModal}
        onSelectLocation={(location) => {
          document.getElementById("destination").value = location;
          closeDestinationModal();
        }}
      />
      <SubConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleModalClose}
        onViewDetails={handleViewDetails}
        message="신청이 완료되었습니다!"
      />
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onClose={() => setIsLoginAlertOpen(false)} // 로그인 알림 모달 닫기
        onLoginRedirect={() => navigate("/login")} // 로그인 페이지로 이동
      />
    </div>
  );
};

export default Tsupport;
