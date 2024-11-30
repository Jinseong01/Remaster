import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobResult.css";
import CancelConfirmModal from "../../../../components/CancelConfirm/CancelConfirmModal";
import "../pagenation.css";

const JobResult = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const [jobList, setJobList] = useState(
    currentUser && currentUser.job ? currentUser.job : []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 5; // 페이지당 아이템 개수

  // 현재 페이지에 표시될 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobList.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(jobList.length / itemsPerPage);

  const openModal = (index) => {
    setSelectedJobIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJobIndex(null);
  };

  const handleConfirmCancel = () => {
    const selectedJob = jobList[selectedJobIndex];

    const updatedJobs = jobList.filter((item) => item !== selectedJob);

    setJobList(updatedJobs);

    setCurrentUser({
      ...currentUser,
      job: updatedJobs,
    });

    closeModal();
  };

  const isPastDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 일자리 항목 클릭 시 상세 페이지로 이동
  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="jobresult-container">
      <div className="job-list-section">
        <div className="job-list-header">
          <div className="company">회사</div>
          <div className="working-hours">근무시간</div>
          <div className="deadline">신청 마감일</div>
          <div className="remarks">비고</div>
        </div>

        {currentItems.length === 0 ? (
          <div className="no-jobs-message">신청한 일자리가 없습니다.</div>
        ) : (
          currentItems.map((jobItem, index) => (
            <div
              className="job-item clickable" // 클릭 가능한 스타일 추가
              key={index}
              onClick={() => handleJobClick(jobItem.id)} // 상세 페이지로 이동
            >
              <div className="company">{jobItem.company}</div>
              <div className="working-hours">{jobItem.working_hours}</div>
              <div className="deadline">{jobItem.deadline}</div>
              <div className="remarks">
                {isPastDeadline(jobItem.deadline) ? (
                  <button className="cancel-button disabled" disabled>
                    취소 불가
                  </button>
                ) : (
                  <button
                    className="cancel-button"
                    onClick={(e) => {
                      e.stopPropagation(); // 행 클릭 이벤트와 충돌 방지
                      openModal(index + indexOfFirstItem);
                    }}
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
          {/* 이전 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          >
            이전
          </button>

          {/* 페이지 번호 */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* 다음 버튼 */}
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

      <CancelConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default JobResult;
