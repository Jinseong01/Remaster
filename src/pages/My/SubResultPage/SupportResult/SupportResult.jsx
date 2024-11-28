import React, { useState } from "react";
import "./SupportResult.css";
import CancelConfirmModal from "../../../../components/CancelConfirm/CancelConfirmModal";

const SupportResult = ({ currentUser }) => {
  // 사용자 데이터에서 combinedSupport 생성
  const getCombinedSupport = () => {
    if (!currentUser) return [];
    return [
      ...currentUser.l_support.map((item) => ({
        ...item,
        category: "생활지원",
      })),
      ...currentUser.t_support.map((item) => ({
        ...item,
        category: "이동지원",
      })),
    ];
  };

  const [combinedSupport, setCombinedSupport] = useState(getCombinedSupport);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupportIndex, setSelectedSupportIndex] = useState(null);

  const openModal = (index) => {
    setSelectedSupportIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupportIndex(null);
  };

  // 항목 삭제 핸들러
  const handleConfirmCancel = () => {
    const selectedSupport = combinedSupport[selectedSupportIndex];

    // 현재 l_support와 t_support를 필터링
    if (selectedSupport.category === "생활지원") {
      currentUser.l_support = currentUser.l_support.filter(
        (item) => item !== selectedSupport
      );
    } else if (selectedSupport.category === "이동지원") {
      currentUser.t_support = currentUser.t_support.filter(
        (item) => item !== selectedSupport
      );
    }

    // 상태를 새로 갱신
    const updatedCombinedSupport = [
      ...currentUser.l_support.map((item) => ({
        ...item,
        category: "생활지원",
      })),
      ...currentUser.t_support.map((item) => ({
        ...item,
        category: "이동지원",
      })),
    ];

    // 상태 업데이트
    setCombinedSupport(updatedCombinedSupport);
    console.log("Updated combinedSupport:", updatedCombinedSupport);

    closeModal(); // 모달 닫기
  };

  return (
    <div className="supportresult-container">
      <div className="support-list-section">
        <div className="support-list-header">
          <div className="purpose">목적</div>
          <div className="category">카테고리</div>
          <div className="date">날짜</div>
          <div className="status">상태</div>
        </div>

        {combinedSupport.length === 0 ? (
          <div className="no-support-message">신청된 지원이 없습니다.</div>
        ) : (
          combinedSupport.map((item, index) => (
            <div className="support-item" key={index}>
              <div className="purpose">{item.purpose || item.destination}</div>
              <div className="category">{item.category}</div>
              <div className="date">{item.date || item.start_date}</div>
              <div className="status">
                <button
                  className="cancel-button"
                  onClick={() => openModal(index)}
                >
                  취소
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <CancelConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default SupportResult;
