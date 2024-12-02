import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Sidebar.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { matchRoutes, useNavigate } from "react-router-dom";
import { users } from "../../data/users"; // users 데이터 import

const Sidebar = ({ currentUser }) => { // currentUser.menu_visible
  const [myMenu, setMyMenu] = useState(currentUser?.my_menu || []); // 현재 사용자의 메뉴
  const [restMenu, setRestMenu] = useState(currentUser?.rest_menu || []); // 현재 사용자의 확장 메뉴

  const [isExpanded, setIsExpanded] = useState(false); // 사이드바 확장 상태
  const [isVisible, setIsVisible] = useState(currentUser?.menu_visible ?? true);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [matchedRoute, setMatchedRoute] = useState(null); // 매칭된 경로 상태
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    ...currentUser, // 전달받은 사용자 데이터를 초기화
  });

  useEffect(() => {
    // SpeechRecognition 초기화
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "ko-KR"; // 한국어 설정
    recognition.interimResults = false;
    recognition.continuous = true;

    // 녹음 결과 이벤트
    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript.trim())
        .join("");
      setTranscript((prev) => prev + currentTranscript);

      // 음성 명령 매핑
      const matchedIcon = myMenu.find(
        (icon) => icon.keywords.some((keyword) => keyword === currentTranscript) // 키워드 배열과 비교
      );

      if (matchedIcon) {
        console.log("Matched route:", matchedIcon.route); // 디버깅 메시지
        setMatchedRoute(matchedIcon.route); // 경로 상태에 저장
      }
    };

    // 녹음 종료 이벤트
    recognition.onend = () => {
      setIsRecording(false); // 녹음 상태를 중지로 설정
    };

    recognitionRef.current = recognition;

    return () => {
      // 컴포넌트 언마운트 시 인스턴스 정리
      recognitionRef.current = null;
    };
  }, [myMenu]);

  // matchedRoute 상태 변경 감지 및 라우팅 처리
  useEffect(() => {
    if (matchedRoute && !isRecording) {
      console.log("Updated matchedRoute (after setState):", matchedRoute); // 상태 변경 후 값
      console.log("Navigating to:", matchedRoute);
      navigate(matchedRoute); // 저장된 경로로 이동
    }
  }, [matchedRoute, isRecording, navigate]);

  // 드래그가 끝났을 때 호출되는 함수
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    console.log(currentUser);

    // 목적지가 없을 경우 종료
    if (!destination) return;

    // 동일한 위치로 이동한 경우 종료
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // 상태 업데이트를 위한 새로운 리스트 생성
    let newMyMenu = Array.from(myMenu);
    let newRestMenu = Array.from(restMenu);

    // 소스와 목적지 리스트 결정
    const isSourceMyMenu = source.droppableId === "myMenu";
    const isDestinationMyMenu = destination.droppableId === "myMenu";

    // 해당 메뉴 리스테에서 버튼 제거
    const sourceList = isSourceMyMenu ? newMyMenu : newRestMenu;
    const [movedItem] = sourceList.splice(source.index, 1);

    // 목적지 리스트에 버튼 추가
    const destinationList = isDestinationMyMenu ? newMyMenu : newRestMenu;
    destinationList.splice(destination.index, 0, movedItem);

    console.log("handlerOnDragEnd: newMyMenu 값 체크", newMyMenu);
    console.log("handlerOnDragEnd: newRestMenu 값 체크", newRestMenu);

    // 상태 업데이트
    setMyMenu(newMyMenu);
    setRestMenu(newRestMenu);

    // 상태가 바로 업데이트 되지 않음
    console.log("handlerOnDragEnd: 상태 업데이트 후 myMenu 값 체크", myMenu);
    console.log(
      "handlerOnDragEnd: 상태 업데이트 후 restMenu 값 체크",
      restMenu
    );

    changeMenuToUser(newMyMenu, newRestMenu);
  };

  // 사용자 데이터를 업데이트하고 users 배열을 수정
  const changeMenuToUser = (
    newMyMenu = { newMyMenu },
    newRestMenu = { newRestMenu }
  ) => {
    // 유저 메뉴 수정
    currentUser.my_menu = newMyMenu;
    currentUser.rest_menu = newRestMenu;
  };

  // 사이드바 isVisible 변경
  const changeIsVisibleToUser=()=>{
    currentUser.menu_visible=isVisible;
  }

  useEffect(() => {
    changeIsVisibleToUser();
  }, [isVisible]);
  

  const startRecording = () => {
    if (recognitionRef.current && !isRecording && isVisible) {
      recognitionRef.current.start();
      setIsRecording(true);
      setMatchedRoute(null); // 녹음 시작 시 이전 경로 초기화
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      console.log("stopRecording ");
      setTranscript(""); // 녹음 중지 시 항상 텍스트 초기화
      if (matchedRoute) {
        console.log("Navigating to:", matchedRoute); // 디버깅 메시지
        navigate(matchedRoute); // 저장된 경로로 이동
      }
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (isVisible) {
      if (event.code === "Space") {
        event.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    }
  }, [isVisible, isRecording]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // 사이드 바 축소/확대 시 토글 
  const toggleSidebarVisibility = () => {
    setIsVisible(!isVisible); 
    changeIsVisibleToUser(isVisible); // 상태 변경 로직 
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording]);

  return (
    <div className="record-status">
      <div className="transcription">
        
      </div>
      <img
        src={
          isVisible
            ? `${process.env.PUBLIC_URL}/assets/images/sidebar/minus.png` // 사이드바가 보이는 상태에서는 minus 아이콘
            : `${process.env.PUBLIC_URL}/assets/images/sidebar/plus.png`  // 사이드바가 숨겨진 상태에서는 plus 아이콘
        }
        alt="Toggle Sidebar Visibility"
        className="minus-plus-button"
        onClick={toggleSidebarVisibility} // 가시성 토글
      />
      {isVisible && (
        <>
        {isRecording ? (
          // 녹음 중이면 record.png 이미지 표시
          <>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/sidebar/record.png`}
              alt="녹음 중"
              className="record-icon"
            />
            <p className="transcription-text">{transcript}</p>
          </>
        ) : (
          <p></p>
        )}
      <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
        {" "}
        {/* flex: row */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="myMenu">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="sidebar-droppable"
              >
                {myMenu.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="icon-button"
                        onClick={() => navigate(item.route)} // 클릭 시 라우팅 처리
                      >
                        <img
                          src={item.img}
                          alt="아이콘1"
                          className="icon-image"
                        />
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

            <img
              src={
                isExpanded
                  ? `${process.env.PUBLIC_URL}/assets/images/sidebar/reduce.png` // 축소 아이콘 이미지 경로
                  : `${process.env.PUBLIC_URL}/assets/images/sidebar/expand.png` // 확장 아이콘 이미지 경로
              }
              alt="Toggle Sidebar"
              className="toggle-button"
              onClick={toggleSidebar}
            />

          {/* 추가 아이콘 Droppable (확장 시에만 표시) */}
          {isExpanded && (
            <Droppable droppableId="restMenu">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="sidebar-droppable"
                >
                  {restMenu.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="icon-button"
                          onClick={() => navigate(item.route)} // 클릭 시 라우팅 처리
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="icon-image"
                          />
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </DragDropContext>
      </div>
      </>
      )}
    </div>
  );
};

export default Sidebar;
