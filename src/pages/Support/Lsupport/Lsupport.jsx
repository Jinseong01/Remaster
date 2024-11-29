// src/pages/MyPage/Lsupport/Lsupport.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Lsupport.css";
import MapModal from "../Map/MapModal";
import { ChevronDown } from "lucide-react";
import LsupportData from "../../../data/Lsupport"; // 데이터를 저장하는 파일

const Lsupport = ({ currentUser, loginState, setCurrentUser }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(""); // 시간을 저장하는 상태
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [radioSelections, setRadioSelections] = useState({
    needSignLanguage: "",
    needBathchair: "",
  });

  // 라디오 버튼 상태 관리
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
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    // 필드 값 가져오기
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

    // 로컬 시간대로 날짜 형식 지정 (YYYY/MM/DD 형식으로)
    const localDate = selectedDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "/")
      .replace(/\./, "");

    const newSupport = {
      start: start,
      date: localDate,
      time: selectedTime,
      purpose: reason,
      allergy: allergy,
      pet: pet,
      need_sign_language: radioSelections.needSignLanguage === "yes",
      need_bathchair: radioSelections.needBathchair === "yes",
    };

    // 데이터 저장
    LsupportData.push(newSupport);
    alert("신청이 완료되었습니다.");

    // 사용자 정보에 추가 (예시용)
    setCurrentUser({
      ...currentUser,
      l_support: [...(currentUser.l_support || []), newSupport],
    });
  };

  return (
    <div className="lsupport-page-container">
      <div className="lsupport-page-application-container">
        <div className="support-application-title">생활 지원 신청서</div>

        <div className="lsupport-page-form">
          {/* 날짜 선택 */}
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

          {/* 시간 선택 */}
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

          {/* 출발지 */}
          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="address">
              출발지
            </label>
            <div className="lsupport-input-with-button">
              <input
                type="text"
                id="address"
                className="lsupport-form-input-start"
                placeholder="출발지를 입력하세요"
              />
              <div className="lsupport-location-icon" onClick={openStartModal}>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* 신청 사유 */}
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

          {/* 알레르기 */}
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

          {/* 애완 동물 */}
          <div className="lsupport-form-group">
            <label className="lsupport-page-label" htmlFor="pet">
              애완 동물
            </label>
            <input type="text" id="pet" className="lsupport-form-input-pet" />
          </div>

          {/* 수화 사용 여부 */}
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

          {/* 휠체어 사용 여부 */}
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

        {/* 제출 버튼 */}
        <div className="lsupport-form-submit-container">
          <button
            className="lsupport-form-submit-button"
            onClick={handleSubmit}
          >
            신청
          </button>
        </div>
      </div>

      {/* 출발지 모달 */}
      <MapModal
        isOpen={isStartModalOpen}
        onClose={closeStartModal}
        onSelectLocation={(address) => {
          document.getElementById("address").value = address; // 출발지 설정
          closeStartModal();
        }}
      />
    </div>
  );
};

export default Lsupport;
