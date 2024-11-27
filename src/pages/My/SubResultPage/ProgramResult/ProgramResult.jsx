// src/pages/MyPage/SubResultPage/Program/ProgramResult.jsx
import React, { useState, useEffect } from "react";
import "./ProgramResult.css";
import CancelConfirmModal from "../../../../components/CancelConfirm/CancelConfirmModal";

const ProgramResult = ({ currentUser, setCurrentUser }) => {
  // 사용자 신청 프로그램 데이터
  const [userPrograms, setUserPrograms] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.programs) {
      console.log("Current User Programs:", currentUser.programs);
      setUserPrograms(currentUser.programs);
    }
  }, [currentUser]);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // 모달 열기
  const openModal = (index) => {
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  // 취소 확정 핸들러
  const handleConfirmCancel = () => {
    console.log(`Item at index ${selectedItemIndex} is canceled.`);
    // 선택된 프로그램을 제거
    const updatedItems = userPrograms.filter((_, i) => i !== selectedItemIndex);
    setUserPrograms(updatedItems);
    setCurrentUser({
      ...currentUser,
      programs: updatedItems,
    });
    closeModal();
  };

  return (
    <div className="programresult-container">
      {/* 프로그램 목록 헤더 */}
      <div className="program-list-header">
        <div className="program-title">프로그램명</div>
        <div className="program-deadline">신청 마감일</div>
        <div className="program-start">시작일</div>
        <div className="program-capacity">정원</div>
      </div>

      {/* 프로그램 목록 */}
      <div className="program-list-section">
        {userPrograms.length === 0 ? (
          <div className="no-programs-message">신청된 프로그램이 없습니다.</div>
        ) : (
          userPrograms.map((item, index) => (
            <div className="program-item" key={index}>
              <div className="program-title">{item.title}</div>
              <div className="program-deadline">{item.deadline}</div>
              <div className="program-start">{item.date}</div>
              <div className="program-capacity">
                {item.now_capacity}/{item.max_capacity}
              </div>
              <button
                className="program-cancel-button"
                onClick={() => openModal(index)}
              >
                취소
              </button>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {userPrograms.length > 0 && (
        <div className="pagination">
          <span className="pagination-item">1</span>
          <span className="pagination-item">2</span>
          <span className="pagination-item">3</span>
        </div>
      )}

      {/* 취소 확인 모달 */}
      <CancelConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default ProgramResult;
