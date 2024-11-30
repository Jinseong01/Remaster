import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//컴포넌트
import CompleteModal from '../../components/common/CompleteModal/CompleteModal.jsx';
import Job from '../../components/job/Job.jsx';
import Sidebar from '../../components/side/Sidebar.jsx';
import HelpDialog from '../../components/side/HelpButton.jsx';
//CSS
import './JobsPage.css'
//데이터
import jobs from '../../data/jobs.js';

const JobsPage = ({currentUser}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // 한 페이지당 항목 개수
    const itemsPerPage = 9;

    // 현재 페이지 상태는 URL의 page 파라미터와 동기화
    const [currentPage, setCurrentPage] = useState(1);

    // URL 정리
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let pageFromUrl = parseInt(params.get("page"));
    
        // page가 없으면
        if (isNaN(pageFromUrl)) {
            pageFromUrl = 1;
            navigate("?page=1", { replace: true }); // URL에 page=1 추가
        }

        // page 이동 시
        if (pageFromUrl !== currentPage) {
            setCurrentPage(pageFromUrl);
            navigate(`?page=${pageFromUrl}`, { replace: true });
        }
    }, [location.search, currentPage, navigate]);

    // 현재 페이지에 맞는 jobs 데이터 추출
    const currentJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 전체 페이지 수
    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    // 페이지 번호 클릭
    const handlePageChange = (pageNumber) => {
        navigate(`?page=${pageNumber}`);
    };

    // 페이지 변경 시 상단으로 스크롤
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);


    // 완료 모달창
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    useEffect(() => {
      if (location.state?.completed) {
        setIsCompleteModalOpen(true);
      }
    }, [location.state]);
    const handleCloseCompleteModal = () => {
      setIsCompleteModalOpen(false);
    };

    return (
        <div>
            {currentUser && Object.keys(currentUser).length > 0 && (
                <>
                <Sidebar currentUser={currentUser} />
                <HelpDialog />
                </>
            )}
            {/* 채용공고 항목 */}
            <Job jobs={currentJobs} />
            {/* 페이지 번호 */}
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <CompleteModal text={"지원"} isOpen={isCompleteModalOpen} onClose={handleCloseCompleteModal} onViewHistory={() => {navigate('/mypage')}}  /> 
        </div>
    );
};

export default JobsPage;
