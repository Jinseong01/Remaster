import React, { useEffect, useState } from "react";
import "./Timeline.css";

const Timeline = ({ currentUser }) => {
  const [programYears, setProgramYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  useEffect(() => {
    const today = new Date();
    const yearsMap = {};

    currentUser?.programs?.forEach((program) => {
      const programDate = new Date(program.date);
      if (programDate < today) {
        const year = programDate.getFullYear();
        if (!yearsMap[year]) {
          yearsMap[year] = [];
        }
        yearsMap[year].push(program);
      }
    });

    const sortedYears = Object.keys(yearsMap)
      .map(Number)
      .sort((a, b) => b - a);
    setProgramYears(sortedYears);
    setSelectedYear(sortedYears[0] || null);
    setFilteredPrograms(yearsMap[sortedYears[0]] || []);
  }, [currentUser]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const filtered = currentUser.programs.filter(
      (program) => new Date(program.date).getFullYear() === year
    );
    setFilteredPrograms(filtered);
  };

  return (
    <div className="mypage-timeline">
      {/* 연도 선택 드롭다운 */}
      <div className="year-dropdown">
        <select
          value={selectedYear || ""}
          onChange={(e) => handleYearChange(Number(e.target.value))}
        >
          {programYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="timeline-line"></div>

      {/* 선택된 연도의 프로그램 리스트 */}
      {filteredPrograms.length === 0 ? (
        <div className="no-programs-message">
          해당 연도에 참여한 프로그램이 없습니다.
        </div>
      ) : (
        filteredPrograms.map((program, index) => (
          <div
            key={index}
            className={`timeline-entry ${index % 2 === 0 ? "right" : "left"}`}
          >
            <div className="program-box">
              <strong>{program.title}</strong>
            </div>
            <div className="timeline-point" />
            <div className="image-box">
              {program.image_url ? (
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="program-image"
                />
              ) : (
                <div className="no-image-placeholder">이미지 없음</div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Timeline;
