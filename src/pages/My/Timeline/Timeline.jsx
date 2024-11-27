// src/pages/MyPage/Timeline/Timeline.jsx
import React, { useEffect, useState } from "react";
import "./Timeline.css";

const Timeline = ({ userPrograms }) => {
  // 현재 날짜보다 이전에 시작된 프로그램만 필터링
  const [pastPrograms, setPastPrograms] = useState([]);

  useEffect(() => {
    const today = new Date();
    const filteredPrograms = userPrograms.filter((program) => {
      const programDate = new Date(program.date); // 프로그램의 종료 날짜 기준
      return programDate < today;
    });
    setPastPrograms(filteredPrograms);
  }, [userPrograms]);

  return (
    <div className="mypage-timeline">
      <div className="year-display">2024</div>
      <div className="timeline-line"></div>

      {/* 프로그램 리스트 표시 */}
      {pastPrograms.length === 0 ? (
        <div className="no-programs-message">참여한 프로그램이 없습니다.</div>
      ) : (
        pastPrograms.map((program, index) => (
          <div
            key={index}
            className={`timeline-entry ${index % 2 === 0 ? "left" : "right"}`}
          >
            {/* 프로그램 정보 표시 */}
            <div className="program-box">
              <div className="program-info">
                <strong>{program.title}</strong>
                <br />
                <span className="program-description">{program.content}</span>
                <br />
                <span className="program-location">{program.location}</span>
                <br />
                <span className="program-date">{`날짜: ${program.date}`}</span>
              </div>
            </div>
            {/* 이미지가 있을 경우 이미지 박스 */}
            {program.image_url && (
              <div className="image-box">
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="program-image"
                />
              </div>
            )}
            {/* 타임라인 포인트 */}
            <div
              className={`timeline-point ${index % 2 === 0 ? "left" : "right"}`}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Timeline;
