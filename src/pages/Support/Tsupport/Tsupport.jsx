import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Tsupport.css";
import MapModal from "../Map/MapModal";
import { ChevronDown } from "lucide-react";
import TsupportData from "../../../data/Tsupport"; // 데이터를 저장하는 파일

const Tsupport = ({ currentUser, loginState, setCurrentUser }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(""); // 시간 상태
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [radioSelections, setRadioSelections] = useState({
    needSignLanguage: "",
    needBathchair: "",
    needReturn: "",
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

  const openDestinationModal = () => setIsDestinationModalOpen(true);
  const closeDestinationModal = () => setIsDestinationModalOpen(false);

  const handleSubmit = () => {
    if (!loginState) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    // 필드 요소들을 가져옴
    const startElement = document.getElementById("start");
    const destinationElement = document.getElementById("destination");
    const transportationElement = document.getElementById("transportation");

    // 필수 요소 확인
    if (!startElement || !destinationElement || !transportationElement) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 필드 값 가져오기
    const start = startElement.value;
    const destination = destinationElement.value;
    const transportation = transportationElement.value;

    // 날짜와 시간이 선택되었는지 확인
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    const needForReturn = radioSelections.needReturn === "yes";
    const needSignLanguage = radioSelections.needSignLanguage === "yes";
    const needBathchair = radioSelections.needBathchair === "yes";

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
      departure_location: start,
      destination: destination,
      date: localDate,
      time: selectedTime,
      vehicle: transportation,
      need_for_return: needForReturn,
      need_sign_language: needSignLanguage,
      need_bathchair: needBathchair,
    };

    // 데이터 저장
    TsupportData.push(newSupport);
    alert("신청이 완료되었습니다.");

    // 사용자 정보에 추가 (예시용)
    setCurrentUser({
      ...currentUser,
      t_support: [...(currentUser.t_support || []), newSupport],
    });
  };

  return (
    <div className="tsupport-page-container">
      <div className="tsupport-page-application-container">
        <div className="support-application-title">이동 지원 신청서</div>

        <div className="tsupport-page-form">
          {/* 날짜 선택 */}
          <div className="form-group">
            <label className="tsupport-page-label" htmlFor="date-picker">
              날짜
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              id="date-picker"
              className="form-input"
              dateFormat="yyyy/MM/dd"
              placeholderText="날짜를 선택하세요"
            />
          </div>

          {/* 시간 선택 */}
          <div className="form-group">
            <label className="tsupport-page-label" htmlFor="time">
              시간
            </label>
            <input
              type="time"
              id="time"
              className="form-input"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          {/* 출발지 선택 */}
          <div className="form-group">
            <label className="tsupport-page-label" htmlFor="start">
              출발지
            </label>
            <div className="input-with-button">
              <input type="text" id="start" className="form-input" />
              <ChevronDown
                className="location-icon"
                size={24}
                onClick={openStartModal}
              />
            </div>
          </div>

          {/* 목적지 선택 */}
          <div className="form-group">
            <label className="tsupport-page-label" htmlFor="destination">
              목적지
            </label>
            <div className="input-with-button">
              <input type="text" id="destination" className="form-input" />
              <ChevronDown
                className="location-icon"
                size={24}
                onClick={openDestinationModal}
              />
            </div>
          </div>

          {/* 이동 수단 */}
          <div className="form-group">
            <label className="tsupport-page-label" htmlFor="transportation">
              이동 수단
            </label>
            <input type="text" id="transportation" className="form-input" />
          </div>

          {/* 복귀 여부 */}
          <div className="form-group">
            <label className="tsupport-page-label">복귀 여부</label>
            <div className="options-group">
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

          {/* 수화 사용 여부 */}
          <div className="form-group">
            <label className="tsupport-page-label">수화 사용 여부</label>
            <div className="options-group">
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
          <div className="form-group">
            <label className="tsupport-page-label">휠체어 사용 여부</label>
            <div className="options-group">
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

          {/* 신청 버튼 */}
          <div className="form-submit-container">
            <button className="form-submit-button" onClick={handleSubmit}>
              신청
            </button>
          </div>
        </div>
      </div>

      {/* 출발지 및 목적지 모달 */}
      <MapModal isOpen={isStartModalOpen} onClose={closeStartModal} />
      <MapModal
        isOpen={isDestinationModalOpen}
        onClose={closeDestinationModal}
      />
    </div>
  );
};

export default Tsupport;
