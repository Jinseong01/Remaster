import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Program.css";
import programs from "../../data/program";
import Sidebar from "../../components/side/Sidebar";
import HelpButton from "../../components/side/HelpButton";
import ProgramImageModal from "../../components/program/ProgramImageModal";
import LoginAlertModal from "../../components/common/LoginAlert/LoginAlertModal";
import DuplicateModal from "../../components/common/DuplicateModal/DuplicateModal";

function Program({ currentUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 사이드바 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 선택된 프로그램 상태 관리
  const programInfo = location.state?.program;
  const [selectedProgram, setSelectedProgram] = useState(
    programInfo || programs[0]
  );

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalImage, setModalImage] = useState(null); // 클릭한 이미지 저장
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false); // 중복 신청 모달 상태
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false); // 로그인 알림 모달 상태

  // 프로그램 카드 슬라이더 세팅
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.2,
    slidesToScroll: 3,
    draggable: true,
  };

  // 로그인 모달창 로그인하기 처리 콜백 함수
  const handleLoginRedirect = () => {
    setIsLoginAlertOpen(false); // 모달 닫기
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 이미지 상세 보기
  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // 신청하기 버튼 처리
  const handleApplyButtonClick = () => {
    if (!currentUser || Object.keys(currentUser).length === 0) {
      // 로그인 상태가 아니면 모달 열기
      setIsLoginAlertOpen(true);
      return;
    }

    // 신청하려는 프로그램이 이미 유저의 programs 배열에 있는지 확인
    const isAlreadyApplied = currentUser.programs.some(
      (program) => program.id === selectedProgram.id
    );

    if (isAlreadyApplied) {
      // 중복 신청 시 모달 열기
      setIsDuplicateDialogOpen(true);
      return;
    }

    // 로그인 상태이며 중복 신청이 아니면 신청 페이지로 이동
    navigate("/apply", { state: { program: selectedProgram } });
  };

  // 중복 신청시 신청내역 이동
  const handleViewStatus = () => {
    setIsDuplicateDialogOpen(false);
    navigate("/mypage/result-page/programresult"); // 신청현황 페이지로 이동
  };

  return (
    <div className="App">
      {/* currentUser가 유효한 객체일 때 Sidebar 표시 */}
      {currentUser && Object.keys(currentUser).length > 0 && (
        <>
          <Sidebar currentUser={currentUser} />
          <HelpButton currentUser={currentUser} />
        </>
      )}

      {selectedProgram && (
        <>
          <div className="program-info">
            <img
              src={`${process.env.PUBLIC_URL}/${selectedProgram.image_url}`}
              alt="프로그램 이미지"
              onClick={() =>
                openModal(
                  `${process.env.PUBLIC_URL}/${selectedProgram.image_url}`
                )
              } // 클릭하면 모달 열림
            />

            <div className="program-details">
              <div className="program-details-h2-and-address-phone">
                <h2>{selectedProgram.title}</h2>
                <div className="address-phone">
                  <p>주소: {selectedProgram.location}</p>
                  <p>담당자: {selectedProgram.phone_number}</p>
                </div>
              </div>

              {/* Divider 추가 */}
              <div className="program-divider"></div>

              <h3>내용: </h3>
              <div className="content">
                <p>{selectedProgram.content}</p>
              </div>

              <div className="date-deadline-button">
                <div className="program-date-deadline">
                  <p className="program-date-deadline-date">
                    날짜: {selectedProgram.date}
                  </p>
                  <p className="program-date-deadline-dead-line">
                    신청 기한: {selectedProgram.deadline} 까지
                  </p>
                </div>

                <button
                  className="apply-button"
                  onClick={handleApplyButtonClick}
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
              <img
                src={`${process.env.PUBLIC_URL}/${program.image_url}`}
                alt={`프로그램 포스터 ${program.id}`}
              />
              <p>{program.title}</p>
              <p>
                잔여인원: {program.now_capacity}/{program.max_capacity}
              </p>
            </div>
          ))}
        </Slider>
      </div>
      <DuplicateModal
        text={"신청"}
        isOpen={isDuplicateDialogOpen}
        onClose={() => setIsDuplicateDialogOpen(false)}
        onRedirect={handleViewStatus}
      />
      <ProgramImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={modalImage}
      />
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onClose={() => setIsLoginAlertOpen(false)}
        onLoginRedirect={handleLoginRedirect}
      />
    </div>
  );
}

export default Program;
