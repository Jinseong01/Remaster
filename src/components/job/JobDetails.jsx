import React from 'react';
// hook
import useJobTable from '../../hook/useJobTable.jsx';
// CSS
import styles from './JobDetails.module.css';

const JobDetails = ({ job, onNext }) => {
  // 테이블에 필요한 메소드/속성
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useJobTable(job);

  return (
    <>
      <table {...getTableProps()} className={styles.jobDetailTable}>
        <thead>
          {headerGroups.map((headerGroup, index) => {
            if (index === 0) {
              return (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  <th colSpan="2">{headerGroup.headers[0].Header}</th>
                </tr>
              );
            }
            return null; // 추가적인 headerGroup이 있을 경우 처리
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                <td className={styles.labelCell}>{row.cells[0].render('Cell')}</td>
                <td className={styles.valueCell}>{row.cells[1].render('Cell')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <button className={styles.nextButton} onClick={onNext}>다음</button>
      </div>
    </>
  );
};

export default JobDetails;
