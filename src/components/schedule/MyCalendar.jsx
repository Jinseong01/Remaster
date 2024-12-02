import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
// CSS
import styles from './MyCalendar.module.css';

const MyCalendar = ({ events, onEventChange, onMonthChange, editable }) => {
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendar}>
        <FullCalendar
          timeZone='Asia/Seoul'
          plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today'
          }}
          
          locale="ko"
          height="auto"
          dayMaxEvents={true}
          fixedWeekCount={false}
          eventContent={(eventInfo) => {
            // 제목만 표시하고 날짜, 시간은 숨기기
            return (
              <div className={styles.fcEventTitle}>{eventInfo.event.title}</div>
            );
          }}
          eventDrop={onEventChange} // 드래그해서 옮길때 함수
          editable={editable} // 수정 가능 여부
          events={events} // 달력 데이터
          datesSet={(info) => onMonthChange(info.view.currentStart)} // 월 변경 이벤트
        />
      </div>
    </div>
  );
};

export default MyCalendar;
