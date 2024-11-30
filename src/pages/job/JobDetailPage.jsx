import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 컴포넌트
import JobDetails from '../../components/job/JobDetails.jsx';
import InfoCheck from '../../components/job/InfoCheck.jsx';
import LoginAlertModal from '../../components/LoginAlert/LoginAlertModal.jsx';
// CSS
import styles from './JobDetailPage.module.css';
// 데이터
import jobs from '../../data/jobs.js';

const JobDetailPage = ({ currentUser, loginState, setCurrentUser }) => {
  // URL에서 id를 가져옴
  const { id } = useParams();

  // 데이터에서 id로 해당 객체를 찾음
  const job = jobs.find((job) => job.id === parseInt(id));

  // 컴포넌트 상태를 관리하기 위해 useState 사용
  const [isDetailsPage, setIsDetailsPage] = useState(true);

  // "다음" 버튼 클릭 시 페이지 변경
  const handleNext = (isNext) => {
    setIsDetailsPage(!isNext); // 페이지 전환
  };

  const navigate = useNavigate();

  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState(true); // 로그인 모달 상태 추가

  // 모달 창
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleConfirm = () => {
    if (!loginState) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

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

    console.log(currentUser.job);
    setIsModalOpen(false);
    navigate(`/jobs`, { state: { completed: true } });
  };

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
    {/* 로그인 상태가 false일 때만 모달 띄우기 */}
    {!loginState && isLoginAlertModalOpen && (
      <LoginAlertModal
        isOpen={isLoginAlertModalOpen}
        onClose={() => setIsLoginAlertModalOpen(false)}
        onLoginRedirect={() => navigate('/login')}
      />
    )}

    {/* 로그인 상태일 때만 InfoCheck 컴포넌트 렌더링 */}
    {loginState && (
      <InfoCheck
        onBack={() => handleNext(false)}
        onOpenModal={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        currentUser={currentUser}
        loginState={loginState}
      />
    )}
  </>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
