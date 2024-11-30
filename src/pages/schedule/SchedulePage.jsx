import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//hook
import useSchedule from '../../hook/useSchedule';
//데이터 컨버터
import scheduleConverter from '../../converter/scheduleConverter';
//컴포넌트
import MyCalendar from '../../components/schedule/Calendar';
import Schedule from '../../components/schedule/Schedule';
import AddScheduleModal from '../../components/schedule/AddScheduleModal';
import EditScheduleModal from '../../components/schedule/EditScheduleModal';
import DeleteScheduleModal from '../../components/schedule/DeleteScheduleModal';
import LoginAlertModal from '../../components/common/LoginAlert/LoginAlertModal';
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
  const [isLoginAlertModalOpen, setIsLoginAlertModalOpen] = useState(false); // 로그인 모달창
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

  // 로그인 상태
  const checkLogin = () => {
    if(!loginState) {
      setIsLoginAlertModalOpen(true);
    }
    else {
      setShowAddModal(true);
    }
  }

  const { events, handleEventChange, addSchedule, editSchedule, deleteSchedule } = useSchedule(originalEvent, currentUser, setCurrentUser);

  // 로그인 상태
  return (
    <div className="page-container">
      {loginState?
      <MyCalendar events={events} onEventChange={handleEventChange} onMonthChange={handleMonthChange} editable={true}/>
      : <MyCalendar editable={false} onEventChange={()=>{}} onMonthChange={()=>{}}/>}
      
      <Schedule
        events={events}
        currentDate={currentDate}
        onAddOpen={() => checkLogin()}
        onEditOpen={controlEditModal}
        onDeleteOpen={controlDeleteModal}
      />

      <LoginAlertModal isOpen={isLoginAlertModalOpen} onClose={() => setIsLoginAlertModalOpen(false)} onLoginRedirect={() => navigate('/login')}/>
      <AddScheduleModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} addSchedule={addSchedule}/>
      <EditScheduleModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} editSchedule={editSchedule} selectedEvent={selectedEvent}/>
      <DeleteScheduleModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} deleteSchedule={deleteSchedule} selectedEvent={selectedEvent}/>
    </div>
  );
};

export default SchedulePage;