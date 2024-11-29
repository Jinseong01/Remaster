import React from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';
// CSS
import styles from './Job.module.css';

const Job = ({ jobs }) => {
    // Masonry 레이아웃 설정
    const breakpointColumnsObj = {
        default: 3, // 기본 3열
        1100: 3, // 1100px 이상 3열
        700: 2, // 700px 이상 2열
        500: 1 // 500px 이상 1열
    };

    // 상세 페이지 이동
    const navigate = useNavigate();
    const handleCardClick = (jobId) => {
        navigate(`/job/${jobId}`);
    };

    return (
        <div className={styles.jobs}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.myMasonryGrid}
                columnClassName={styles.myMasonryGridColumn}
            >
                {/* 각 채용공고 항목 */}
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className={styles.jobCard}
                        onClick={() => handleCardClick(job.id)}
                    >
                        <img src={job.thumbnail_url} alt={job.company} />
                        <h3>{job.company}</h3>
                        <h4>{job.position}</h4>
                        <p>마감기한 : {job.deadline}</p>
                        <ul>
                            {job.requirements.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default Job;
