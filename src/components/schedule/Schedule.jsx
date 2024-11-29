import React, { useState } from 'react';
// CSS
import styles from './Schedule.module.css';

const Schedule = ({ events, currentDate, onAddOpen, onEditOpen, onDeleteOpen }) => {
  const [activeTab, setActiveTab] = useState('program'); // 'program', 'support', 'personal'

  // 날짜를 MM/DD 형식으로 변환하는 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 탭에 따른 이벤트 필터링
  const filteredEvents = events.filter((event) => {
    const currentYear = currentDate.getFullYear(); // 현재 달력의 연도
    const currentMonth = currentDate.getMonth(); // 현재 달력의 월

    const eventStart = event.start ? new Date(event.start) : new Date(event.date);
    const eventYear = eventStart.getFullYear(); // 일정의 연도
    const eventMonth = eventStart.getMonth(); // 일정의 월

    switch (activeTab) {
      case 'program':
        return event.type === 'program' && eventMonth === currentMonth && eventYear === currentYear;
      case 'support':
        return event.type === 'support' && eventMonth === currentMonth && eventYear === currentYear;
      case 'schedule':
        return event.type === 'schedule' && eventMonth === currentMonth && eventYear === currentYear;
      default:
        return false;
    }
  });

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.scheduleHeader}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'program' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('program')}
        >
          프로그램
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'support' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('support')}
        >
          활동 보조
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          개인 일정
        </button>
      </div>
      {activeTab === 'schedule' && (
        <div className={styles.addScheduleBtn}>
          <button onClick={() => onAddOpen()} className={styles.plusBtn}>
            <img src="/assets/images/schedule/add.png" alt="add" className={styles.actionIcon} />
          </button>
        </div>
      )}
      <div className={styles.scheduleContent}>
        {filteredEvents.sort((a, b) => {
          const aDate = a.start ? new Date(a.start) : new Date(a.date);
          const bDate = b.start ? new Date(b.start) : new Date(b.date);
          return new Date(aDate) - new Date(bDate);
        }).map(event => (
          <div key={event.id} className={styles.scheduleItem}>
            <div className={styles.dateLabel}>
              {formatDate(event.date)} {event.title}
            </div>
            {(() => {
              switch (event.type) {
                case 'program':
                case 'support':
                  return (
                    <>
                      <div className={styles.timeLabel}>장소 : {event.location}</div>
                      <div className={styles.timeLabel}>시간 : {event.time}</div>
                    </>
                  );
                case 'schedule':
                  return (
                    <>
                      <div className={styles.timeLabel}>시간 : {event.time}</div>
                      <div className={styles.eventActions}>
                        <div className={styles.scheduleActions}>
                          <button className={styles.editBtn} onClick={() => onEditOpen(event)}>
                            <img src="/assets/images/schedule/edit.png" alt="edit" className={styles.actionIcon} />
                          </button>
                          <button className={styles.deleteBtn} onClick={() => onDeleteOpen(event)}>
                            <img src="/assets/images/schedule/delete.png" alt="delete" className={styles.actionIcon} />
                          </button>
                        </div>
                      </div>
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div className={styles.noSchedule}>등록된 일정이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
