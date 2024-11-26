import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Program.css';
import programs from "../../data/program";
import Sidebar from "../../components/side/Sidebar"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Program() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);

  const navigate = useNavigate();

  // 도움말 다이얼로그 열기/닫기 핸들러
  const toggleHelpDialog = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  // 사이드바 열기/닫기 핸들러
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 1,
    draggable: true,
  };
  
  return (
    <div className="App">
      <Sidebar />

        {selectedProgram && (
          <>
            <div className="program-info"> 
              <img src={`${process.env.PUBLIC_URL}/${selectedProgram.image_url}`} alt="프로그램 이미지" />
            
              <div className="program-details">

                <div className="program-details-h2-and-address-phone">
                  <h2>{selectedProgram.title}</h2>
                  <div className="address-phone">
                    <p>주소: {selectedProgram.location}</p>
                    <p>담당자: {selectedProgram.phone_number}</p>
                  </div>
                </div>

                <div className="content">
                  <p>{selectedProgram.content}</p>
                </div>

                <div className="date-deadline-button">
                  <div className="date-deadline">
                    <p className="date">날짜: {selectedProgram.date}</p>
                    <p className="dead-line">신청 기한: {selectedProgram.deadline} 까지</p>
                  </div>

                  <button 
                    className="apply-button" 
                    onClick={() => navigate('/apply', { state: { program: selectedProgram } })}
                  >
                    신청하기
                  </button>
                </div>

              </div>
            </div>
          </>
        )}
      

      <div className="program-cards">
        <Slider {...sliderSettings}>
          {programs.map((program) => (
            <div
              key={program.id}
              className="program-card"
              onClick={() => setSelectedProgram(program)}
            >
              <img src={`${process.env.PUBLIC_URL}/${program.image_url}`} alt={`프로그램 포스터 ${program.id}`} />
              <p>{program.title}</p>
              <p>잔여인원: {program.now_capacity}/{program.max_capacity}</p>
            </div>
          ))}
        </Slider>
      </div>

      <button className="help-button" onClick={toggleHelpDialog}>
      <img
        src="/assets/images/program/guidelogo.png"
        alt="도움말"
        className="help-button-image"
      />
      </button>

      {isHelpOpen && (
        <div className="help-dialog-overlay" onClick={toggleHelpDialog}>
          <div className="help-dialog-background">
            <div className="logo-and-h2">
              <img src={`${process.env.PUBLIC_URL}/assets/images/program/guidelogo.png`} alt="로고 이미지" className="logo" />
              <h2>어떤 기능인가요?</h2>
            </div>

            <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
              
              <p>여기에 프로그램 사용 방법에 대한 설명을 추가할 수 있습니다.</p>
              
            </div>
            {/* <button className="close-button" onClick={toggleHelpDialog}>
                닫기
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Program;


