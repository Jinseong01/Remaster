// src/pages/MyPage/SubResultPage/JobResult/JobResult.jsx

import React, { useState } from "react";
import "./JobResult.css";
import CancelConfirmModal from "../../../../components/CancelConfirm/CancelConfirmModal";

const JobResult = ({ currentUser, setCurrentUser }) => {
  // currentUser가 없거나 job 데이터가 없을 경우 기본 값을 설정합니다.
  const [jobList, setJobList] = useState(
    currentUser && currentUser.job ? currentUser.job : []
  );

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  // 모달 열기
  const openModal = (index) => {
    setSelectedJobIndex(index);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJobIndex(null);
  };

  // 항목 삭제 핸들러
  const handleConfirmCancel = () => {
    setJobList((prevJobList) =>
      prevJobList.filter((_, i) => i !== selectedJobIndex)
    );

    // currentUser의 상태를 업데이트 (예시)
    setCurrentUser({
      ...currentUser,
      job: jobList.filter((_, i) => i !== selectedJobIndex),
    });

    closeModal();
  };

  return (
    <div className="jobresult-container">
      {/* 일자리 리스트 섹션 */}
      <div className="job-list-section">
        {/* 헤더 */}
        <div className="job-list-header">
          <div className="company">회사</div>
          <div className="working-hours">근무시간</div>
          <div className="deadline">신청 마감일</div>
        </div>

        {/* 일자리 항목들 */}
        {jobList.length === 0 ? (
          <div className="no-jobs-message">신청한 일자리가 없습니다.</div>
        ) : (
          jobList.map((jobItem, index) => (
            <div className="job-item" key={index}>
              <div className="company">{jobItem.company}</div>
              <div className="working-hours">{jobItem.working_hours}</div>
              <div className="deadline">{jobItem.deadline}</div>
              <div className="cancel">
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

      {/* 페이지네이션 */}
      {jobList.length > 0 && <div className="pagination">1 2 3</div>}

      {/* 취소 확인 모달 */}
      <CancelConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default JobResult;
