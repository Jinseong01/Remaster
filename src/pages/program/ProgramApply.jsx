import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProgramApply.css";
import ProgramImageModal from "../../components/program/ProgramImageModal";
import ConfirmationDialog from "../../components/program/ConfirmationDialog";
import CompletionDialog from "../../components/program/CompletionDialog";
import ChangeConfirmModal from "../../components/ChangeConfirm/ChangeConfirmModal";

function ProgramApply({ currentUser, setCurrentUser }) {
  const [isChecked, setIsChecked] = useState(false); // 체크 박스
  const [isCheckApply, setIsCheckApply] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false); // 신청 완료 다이얼로그 상태

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalImage, setModalImage] = useState(null); // 클릭한 이미지 저장
  const [isEditable, setIsEditable] = useState(false); // 텍스트 수정 가능 여부 상태

  const navigate = useNavigate(); // 페이지 라우팅을 위해 useNavigate 사용
  const location = useLocation();
  const programInfo = location.state?.program;

  // 이미지 모달창 관련 
  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const toggleCheckDialog = () => {
    setIsCheckApply(!isCheckApply);
  };

  // 초기 사용자 정보
  const [userInfo, setUserInfo] = useState({
    ...currentUser, // 전달받은 사용자 데이터를 초기화
  });

  const handleChange = (e) => {
    if (!isEditable) return; // isEditable이 false이면 아무 작업도 하지 않음
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value, // 입력 필드의 name 속성에 따라 상태 업데이트
    }));
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // 신청완료 시 users 데이터에 program 추가
  const addProgramToUser = () => {
    // 프로그램을 복사하여 새로운 객체 생성
    const programToAdd = { ...programInfo };

    // 기존 프로그램 목록을 복사하고 새 프로그램을 추가
    const updatedPrograms = [...(currentUser.programs || []), programToAdd];

    // 새로운 사용자 객체 생성
    const updatedUser = {
      ...currentUser,
      programs: updatedPrograms,
    };

    // 상태 업데이트
    setCurrentUser(updatedUser);

    // 디버깅
    console.log("Updated user:", updatedUser);
    console.log("Updated user programs:", updatedPrograms);
  };

  useEffect(() => {
    console.log("Current user programs updated:", currentUser.programs);
  }, [currentUser]);

  const increaseProgramNowCapacity = () => {
    // 현재 프로그램의 `now_capacity`가 `max_capacity`보다 작은 경우에만 증가
    if (programInfo.now_capacity < programInfo.max_capacity) {
      programInfo.now_capacity += 1; // 현재 프로그램의 인원 증가
      console.log(
        "프로그램의 잔여 인원이 증가했습니다:",
        programInfo.now_capacity
      );
    } else {
      console.warn("최대 인원에 도달하여 잔여 인원을 증가시킬 수 없습니다.");
    }
  };

  return (
    <>
      <div className="program-apply">
        {" "}
        {/*신청 전체 화면*/}
        <h2>프로그램 신청 양식</h2>
        <h3>사용자 정보 확인</h3>
        <div className="user-information">
          {" "}
          {/* 사용자 정보 확인 flex: row*/}
          <div className="left">
            <div>
              <label>이름: </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>핸드폰 번호: </label>
              <input
                type="text"
                name="phone_number"
                value={userInfo.phone_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>긴급 번호: </label>
              <input
                type="text"
                name="emergency_phone_number"
                value={userInfo.emergency_phone_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>주소: </label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="right">
            <div className="gender">
              <label>성별: </label>
              <input
                type="text"
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
              />
            </div>
            <div className="weight">
              <label>몸무게: </label>
              <input
                type="text"
                name="weight"
                value={userInfo.weight}
                onChange={handleChange}
              />
            </div>
            <div className="hiehgt">
              <label>키: </label>
              <input
                type="text"
                name="height"
                value={userInfo.height}
                onChange={handleChange}
              />
            </div>
            <div className="disability-type">
              <label>장애종류: </label>
              <input
                type="text"
                name="disability_type"
                value={userInfo.disability_type}
                onChange={handleChange}
              />
            </div>
            <div className="disability-grade">
              <label>장애등급: </label>
              <input
                type="text"
                name="disability_grade"
                value={userInfo.disability_grade}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="divider-horizontal"></div> {/* 구분선 */}
        <h3>프로그램 신청정보</h3>
        <div className="program-information">
          {" "}
          {/* 프로그램 정보 확인 flex: row*/}
          <img
            src={`${process.env.PUBLIC_URL}/${programInfo.image_url}`}
            alt="프로그램 이미지"
            onClick={() => openModal(`${process.env.PUBLIC_URL}/${programInfo.image_url}`)} // 클릭하면 모달 열림
          />
          {/* 세로 divider 추가 */}
          <div className="divider-vertical"></div>
          <div className="program-details">
            {" "}
            {/* 프로그램 텍스트 정보 flex: column*/}
            <div className="program-name">
              <label>프로그램 이름: </label>
              <input
                type="text"
                name="program_name"
                value={programInfo.title}
                onChange={handleChange}
              />
            </div>
            <div className="program-date">
              <label>일정: </label>
              <input
                type="text"
                name="program_date"
                value={programInfo.date}
                onChange={handleChange}
              />
            </div>
            <div className="program-time">
              <label>시간: </label>
              <input
                type="text"
                name="program_time"
                value={programInfo.time}
                onChange={handleChange}
              />
            </div>
            <div className="program-location">
              <label>장소: </label>
              <input
                type="text"
                name="program_location"
                value={programInfo.location}
                onChange={handleChange}
              />
            </div>
            <div className="program-content">
              <label>내용: </label>
              <textarea
                name="program_content"
                value={programInfo.content}
                onChange={handleChange}
                rows="5" /* 3줄로 고정 */
              ></textarea>
            </div>
          </div>
        </div>
        <div className="check">
          <p>
            <span>*</span> 위 정보가 맞음을 확인하였습니다.
          </p>
          <input
            type="checkbox"
            id="confirm-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        {/* 신청완료 버튼 */}
        <div className="person-button">
          <p>
            잔여인원: {programInfo.now_capacity}/{programInfo.max_capacity}
          </p>
          <button
            className="apply-complete"
            onClick={toggleCheckDialog}
            disabled={!isChecked}
          >
            신청완료
          </button>
        </div>
        
      </div>
      <ProgramImageModal isOpen={isModalOpen} onClose={closeModal} image={modalImage} />
      <ConfirmationDialog
        isOpen={isCheckApply}
        onClose={() => setIsCheckApply(false)}
        onConfirm={() => {
          setIsCheckApply(false);
          setShowCompletionDialog(true);
          increaseProgramNowCapacity();
          addProgramToUser();
        }}
      />
      <CompletionDialog
        isOpen={showCompletionDialog}
        onClose={() => navigate("/program")}
        onViewHistory={() => navigate("/mypage")}
      />
    </>
  );
}

export default ProgramApply;
