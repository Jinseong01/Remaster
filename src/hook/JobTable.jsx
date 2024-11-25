import React from 'react';
import { useTable } from 'react-table';

// 테이블 데이터를 처리하는 커스텀 훅
const useJobTable = (job) => {
  
  // 배열을 <ul>과 <li>로 변환
  const formatList = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  // 테이블에 렌더링할 데이터 준비
  const data = React.useMemo(
    () => [
        { label: '기업', value: job.company },
        { label: '직무', value: job.position },
        { label: '위치', value: job.location },
        { label: '근무시간', value: job.working_hours },
        { label: '급여', value: job.pay },
        { label: '마감기한', value: job.deadline },
        { label: '필수조건', value: formatList(job.requirements) },
        { label: '기타사항', value: formatList(job.etc) },
    ],
    [job]
  );

  // 테이블 컬럼 정의
  const columns = React.useMemo(
    () => [
      {
        Header: '상세 정보',
        columns: [
          { accessor: 'label' },
          { accessor: 'value' },
        ],
      },
    ],
    []
  );

  // 테이블 객체 생성
  const tableInstance = useTable({ columns, data });

  return tableInstance;
};

export default useJobTable;