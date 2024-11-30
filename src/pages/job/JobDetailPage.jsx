import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 컴포넌트
import JobDetails from '../../components/job/JobDetails.jsx';
import InfoCheck from '../../components/job/InfoCheck.jsx';
import LoginAlertModal from '../../components/common/LoginAlert/LoginAlertModal.jsx';
import DuplicateModal from '../../components/common/DuplicateModal/DuplicateModal.jsx';
// CSS
import styles from './JobDetailPage.module.css';
// 데이터
import jobs from '../../data/jobs.js';

const JobDetailPage = ({ currentUser, loginState, setCurrentUser }) => {

  // URL에서 id를 가져옴
  const { id } = useParams();
  // 데이터에서 id로 해당 객체를 찾음
  const job = jobs.find((job) => job.id === parseInt(id));

  // 컴포넌트 상태를 관리
  const [isDetailsPage, setIsDetailsPage] = useState(true);
  // "다음" 버튼 클릭 시 컴포넌트 변경
  const handleNext = (isNext) => {
    setIsDetailsPage(!isNext); // 컴포넌트 전환
  };

  // 로그인 모달 창
  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState(true);
  // 지원 모달 창
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 중복 모달 창
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  const navigate = useNavigate();

  // 지원 신청
  const handleConfirm = () => {
    setCurrentUser({
      ...currentUser,
      job: [
        ...currentUser.job,
        {
          id: job.id,
          company: job.company,
          position: job.position,
          location: job.location,
          working_hours: job.working_hours,
          pay: job.pay,
          requirements: job.requirements,
          etc: job.etc,
          deadline: job.deadline,
          thumbnail_url: job.thumbnail_url,
          image_url: job.image_url,
        },
      ],
    });
 
    setIsConfirmModalOpen(false);
    navigate(`/jobs`, { state: { completed: true } });
  };

  // 중복 체크
  const checkDuplicate = () => {
    const isDuplicate = currentUser.job.some(job => job.id === parseInt(id));
    if(isDuplicate) {
      setIsDuplicateModalOpen(true)
    }
    else {
      setIsConfirmModalOpen(true)
    }
  }

  return (
    <div className={styles.jobDetailContainer}>
      {/* 이미지 */}
      <div className={styles.jobDetailImage}>
        <img src={job.image_url} alt={job.company} />
      </div>
      <div className={styles.jobDetailContent}>
        <h1>{isDetailsPage ? '채용 공고' : '정보 확인'}</h1>
        {isDetailsPage ? (
          <JobDetails job={job} onNext={() => handleNext(true)} />
        ) : (
          <>
            {/* 비로그인 */}
            {!loginState && (
              <LoginAlertModal
                isOpen={isLoginAlertModalOpen}
                onClose={() => setIsLoginAlertModalOpen(false)}
                onLoginRedirect={() => navigate('/login')}
              />
            )}

            {/* 로그인 상태 */}
            {loginState && (
              <InfoCheck
                onBack={() => handleNext(false)}
                onOpenModal={() => checkDuplicate()}
                isModalOpen={isConfirmModalOpen}
                onCloseModal={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirm}
                currentUser={currentUser}
                loginState={loginState}
              />
            )}

            {/* 중복지원일 때 */}
            <DuplicateModal
              text={"지원"}
              isOpen={isDuplicateModalOpen}
              onClose={() => setIsDuplicateModalOpen(false)}
              onRedirect={() => navigate('/mypage')}/>
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
