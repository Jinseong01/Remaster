import React, { useState, useEffect } from "react";
import "./ProgramResult.css";
import CancelConfirmModal from "../../../../components/CancelConfirm/CancelConfirmModal";
import "../pagenation.css";

const ProgramResult = ({ currentUser, setCurrentUser }) => {
  const [userPrograms, setUserPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 5; // 페이지당 표시할 항목 수

  useEffect(() => {
    if (currentUser && currentUser.programs) {
      setUserPrograms(currentUser.programs);
    }
  }, [currentUser]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const openModal = (index) => {
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  const handleConfirmCancel = () => {
    const updatedItems = userPrograms.filter((_, i) => i !== selectedItemIndex);
    setUserPrograms(updatedItems);
    setCurrentUser({
      ...currentUser,
      programs: updatedItems,
    });
    closeModal();
  };

  const isPastDate = (date) => {
    const programDate = new Date(date);
    const today = new Date();
    return programDate < today;
  };

  // 페이지네이션 관련 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userPrograms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userPrograms.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="programresult-container">
      <div className="program-list-section">
        <div className="program-list-header">
          <div className="program-title">프로그램명</div>
          <div className="program-deadline">신청 마감일</div>
          <div className="program-start">시작일</div>
          <div className="program-capacity">정원</div>
          <div className="program-remarks">비고</div>
        </div>

        {/* 프로그램 목록 */}
        {currentItems.length === 0 ? (
          <div className="no-programs-message">신청된 프로그램이 없습니다.</div>
        ) : (
          currentItems.map((item, index) => (
            <div className="program-item" key={index}>
              <div className="program-title">{item.title}</div>
              <div className="program-deadline">{item.deadline}</div>
              <div className="program-start">{item.date}</div>
              <div className="program-capacity">
                {item.now_capacity}/{item.max_capacity}
              </div>
              <div className="program-remarks">
                {isPastDate(item.date) ? (
                  <button className="program-cancel-button disabled" disabled>
                    취소 불가
                  </button>
                ) : (
                  <button
                    className="program-cancel-button"
                    onClick={() => openModal(index + indexOfFirstItem)}
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`pagination-item ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            다음
          </button>
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
