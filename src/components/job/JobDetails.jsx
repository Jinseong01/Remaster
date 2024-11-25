import React from 'react';
import useJobTable from '../../hook/JobTable.jsx';

const JobDetails = ({ job, onNext }) => {
  // 테이블에 필요한 메소드/속성
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useJobTable(job);

  return (
    <>
      <table {...getTableProps()} className="job-detail-table">
        <thead>
          {headerGroups.map((headerGroup, index) => {
            if (index === 0) {
              return (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  <th colSpan="2">{headerGroup.headers[0].Header}</th>
                </tr>
              );
            }
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                <td className="label-cell">{row.cells[0].render('Cell')}</td>
                <td className="value-cell">{row.cells[1].render('Cell')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button-container">
        <button className="next-button" onClick={onNext}>다음</button>
      </div>
    </>
  );
};

export default JobDetails;
