// src/pages/MyPage/SubResultPage/SubResultPage.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProgramResult.css";
import CancelConfirmModal from "../../../../components/CancelConfirm/CancelConfirmModal";
import "../pagenation.css";

const ProgramResult = ({ currentUser, setCurrentUser }) => {
  const [userPrograms, setUserPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // 무한 루프 방지를 위한 플래그
  const hasFilteredRef = useRef(false);

  useEffect(() => {
    if (currentUser && currentUser.programs) {
      const sortedPrograms = [...currentUser.programs].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setUserPrograms(sortedPrograms);
    }
  }, [currentUser]);

  useEffect(() => {
    if (hasFilteredRef.current) return; // 이미 필터링을 수행했으면 중단

    const today = new Date();
    const pastPrograms = userPrograms.filter(
      (program) => new Date(program.date) < today
    );

    if (pastPrograms.length > 0) {
      const updatedPrograms = userPrograms.filter(
        (program) => new Date(program.date) >= today
      );

      setUserPrograms(updatedPrograms);
      setCurrentUser({
        ...currentUser,
        programs: updatedPrograms,
        before_programs: [
          ...(currentUser.before_programs || []),
          ...pastPrograms,
        ],
      });

      hasFilteredRef.current = true; // 필터링 완료 플래그 설정
    }
  }, [userPrograms, currentUser, setCurrentUser]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const openModal = (index) => {
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  const handleConfirmCancel = async () => {
    try {
      setIsLoading(true);

      const updatedItems = userPrograms.filter(
        (_, i) => i !== selectedItemIndex
      );
      setUserPrograms(updatedItems);
      setCurrentUser({
        ...currentUser,
        programs: updatedItems,
      });
      setIsLoading(false);
      closeModal();
    } catch (error) {
      console.error("프로그램 취소 실패:", error);
      setApiError("프로그램 취소에 실패했습니다. 다시 시도해주세요.");
      setIsLoading(false);
    }
  };

  const isPastDate = (date) => {
    const programDate = new Date(date);
    const today = new Date();
    return programDate < today;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userPrograms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userPrograms.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (program) => {
    navigate(`/program`, { state: { program } });
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

        {currentItems.length === 0 ? (
          <div className="no-programs-message">신청된 프로그램이 없습니다.</div>
        ) : (
          currentItems.map((item, index) => (
            <div
              className="program-item clickable"
              key={item.id || index} // 고유한 키 사용 (가능하면 item.id 사용 권장)
              onClick={() => handleRowClick(item)}
            >
              <div className="program-title">{item.title}</div>
              <div className="program-deadline">{item.deadline}</div>
              <div className="program-start">{item.date}</div>
              <div className="program-capacity">
                {item.now_capacity}/{item.max_capacity}
              </div>
              <div className="program-remarks">
                {isPastDate(item.date) ? (
                  <button
                    className="program-cancel-button disabled"
                    disabled
                    aria-disabled="true"
                  >
                    취소 불가
                  </button>
                ) : (
                  <button
                    className="program-cancel-button"
                    onClick={(e) => {
                      e.stopPropagation(); // 행 클릭 이벤트와 충돌 방지
                      openModal(index + indexOfFirstItem);
                    }}
                    aria-label={`프로그램 ${item.title} 취소`}
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
            aria-label="이전 페이지"
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
              aria-label={`${i + 1} 페이지`}
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
            aria-label="다음 페이지"
          >
            다음
          </button>
        </div>
      )}

      {apiError && <div className="error-message">{apiError}</div>}

      <CancelConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default ProgramResult;
