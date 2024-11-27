import React, { useState } from "react";
import NaverMapComponent from "./NaverMapComponent"; // 위에서 작성한 컴포넌트를 가져옵니다.
import "./MapModal.css";

const MapModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 입력 변경 처리
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="map-modal-overlay">
      <div className="map-modal-container">
        <div className="map-modal-header">
          <h2>위치 선택</h2>

          {/* 검색창 섹션 추가 */}
          <div className="map-search-container">
            <input
              type="text"
              className="map-search-input"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="위치를 검색하세요"
            />
            <button
              className="map-search-button"
              onClick={() => setSearchQuery(searchQuery)}
            >
              검색
            </button>
          </div>

          <button className="map-close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="map-modal-content">
          <NaverMapComponent searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default MapModal;
