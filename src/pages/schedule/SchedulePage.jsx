import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//hook
import useSchedule from '../../hook/useSchedule';
//데이터 컨버터
import scheduleConverter from '../../converter/scheduleConverter';
//컴포넌트
import Calendar from '../../components/schedule/Calendar';
import Schedule from '../../components/schedule/Schedule';
import AddScheduleModal from '../../components/schedule/AddScheduleModal';
import EditScheduleModal from '../../components/schedule/EditScheduleModal';
import DeleteScheduleModal from '../../components/schedule/DeleteScheduleModal';
//CSS
import './SchedulePage.css'

const SchedulePage = ( {currentUser, loginState, setCurrentUser} ) => {

  const navigate = useNavigate();

  // 달력에 넣기 위한 변환 작업
  const originalEvent = loginState ? scheduleConverter({
    before_programs: currentUser?.before_programs,
    programs: currentUser?.programs,
    l_support: currentUser?.l_support,
    t_support: currentUser?.t_support,
    schedule: currentUser?.schedule
  }) : [];
  
  // 상태변수
  const [showAddModal, setShowAddModal] = useState(false); // 추가 모달창
  const [showEditModal, setShowEditModal] = useState(false); // 수정 모달창
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달창
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트
  const [currentDate, setCurrentDate] = useState(new Date()); // 월 변경에 대한 상태변수

  // 달력 월 변경 감지
  const handleMonthChange = (date) => {
    setCurrentDate(date);
  };

  // 수정 모달
  const controlEditModal = (choice) => {
    setSelectedEvent(choice); // 선택된 이벤트를 상태에 저장
    setShowEditModal(true);
  }

  // 삭제 모달
  const controlDeleteModal = (choice) => {
    setSelectedEvent(choice); // 선택된 이벤트를 상태에 저장
    setShowDeleteModal(true);
  }

  // events가 
  const { events, handleEventChange, addSchedule, editSchedule, deleteSchedule } = useSchedule(originalEvent, currentUser, setCurrentUser);

  // 비로그인 상태
  if (!loginState) {
    return (
        <div className="login-required-container">
            <div className="login-required-content">
                <i className="fas fa-lock login-icon"></i> {/* Font Awesome 아이콘 사용 */}
                <h2>로그인이 필요합니다</h2>
                <p>이 서비스를 이용하려면 로그인이 필요합니다.</p>
                <div className="login-buttons">
                    <button className="login-button" onClick={() => {navigate(`/login`)}}>
                        로그인하기
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // 로그인 상태
  return (
    <div className="page-container">
      <Calendar events={events} onEventChange={handleEventChange} onMonthChange={handleMonthChange} editable={true}/>
      <Schedule
        events={events}
        currentDate={currentDate}
        onAddOpen={() => setShowAddModal(true)}
        onEditOpen={controlEditModal}
        onDeleteOpen={controlDeleteModal}
      />

      <AddScheduleModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} addSchedule={addSchedule}/>
      <EditScheduleModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} editSchedule={editSchedule} selectedEvent={selectedEvent}/>
      <DeleteScheduleModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} deleteSchedule={deleteSchedule} selectedEvent={selectedEvent}/>
    </div>
  );
};

export default SchedulePage;