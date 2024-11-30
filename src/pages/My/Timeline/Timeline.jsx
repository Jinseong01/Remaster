import React, { useEffect, useState } from "react";
import "./Timeline.css";

const Timeline = ({ currentUser }) => {
  const [programYears, setProgramYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    const today = new Date();
    const yearsMap = {};

    currentUser?.before_programs?.forEach((program) => {
      const programDate = new Date(program.date);
      if (!isNaN(programDate) && programDate < today) {
        // 유효한 날짜인지 확인
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

    for (const year in yearsMap) {
      yearsMap[year].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    console.log("Years Map:", yearsMap); // 디버깅 로그
    setProgramYears(sortedYears);
    setSelectedYear(sortedYears[0] || null);
    setFilteredPrograms(yearsMap[sortedYears[0]] || []);
  }, [currentUser]);

  const handleYearChange = (year) => {
    setSelectedYear(year);

    const filtered = currentUser.before_programs
      .filter((program) => new Date(program.date).getFullYear() === year)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 날짜 순 정렬

    setFilteredPrograms(filtered);
  };

  const getImageSrc = (url) => {
    // 올바른 경로를 반환
    if (url.startsWith("http") || url.startsWith("/")) {
      return url; // 절대 경로
    }
    return `${process.env.PUBLIC_URL}/${url}`; // 상대 경로를 public 디렉토리 기준으로 변환
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

      {/* 타임라인 선: 프로그램이 있을 경우에만 렌더링 */}
      {filteredPrograms.length > 0 && <div className="timeline-line"></div>}

      {/* 선택된 연도의 프로그램 리스트 */}
      {filteredPrograms.length === 0 ? (
        <div className="no-programs-message">참여한 프로그램이 없습니다.</div>
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
                  src={getImageSrc(program.image_url)}
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
