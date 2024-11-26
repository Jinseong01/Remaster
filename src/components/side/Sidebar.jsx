import React, {useState, useEffect, useRef} from "react";
import "./Sidebar.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { matchRoutes, useNavigate } from "react-router-dom";

const Sidebar= ()=>{

    // 아이콘 데이터
  const [defaultIcons, setDefaultIcons] = useState([
    { id: "1", name: "프로그램", img: "/assets/images/sidebar/program-icon.png", route: "/program", keywords: ["프로그램", "프로그램으로 이동해주세요", "program"]},
    { id: "2", name: "활동지원", img: "/assets/images/sidebar/support-icon.png", route: "/activity", keywords: ["활동 지원", "활동지원", "activity"]},
    { id: "3", name: "공지사항", img: "/assets/images/sidebar/notice-icon.png", route: "/notice", keywords: ["공지 사항", "공지", "notice"]}
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [matchedRoute, setMatchedRoute] = useState(null); // 매칭된 경로 상태
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // SpeechRecognition 초기화
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
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
      const matchedIcon = defaultIcons.find((icon) =>
        icon.keywords.some((keyword) => keyword === currentTranscript) // 키워드 배열과 비교
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
  }, [defaultIcons]);

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
    if (!result.destination) return;

    const reorderedItems = Array.from(defaultIcons);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setDefaultIcons(reorderedItems);
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
      setMatchedRoute(null); // 녹음 시작 시 이전 경로 초기화
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      console.log("stopRecording ")
      if (matchedRoute) {
        console.log("Navigating to:", matchedRoute); // 디버깅 메시지
        navigate(matchedRoute); // 저장된 경로로 이동
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // 스페이스바의 기본 스크롤 방지
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording]);

  return (
    <div className="sidebar-dnd">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-area">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='sidebar-droppable'
            >
              {defaultIcons.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='icon-button'
                      onClick={() => navigate(item.route)} // 클릭 시 라우팅 처리
                    >
                      <img src={item.img} alt="아이콘1" className="icon-image" />
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="transcription">
        <h3>녹음 상태: {isRecording ? "녹음 중..." : "중지됨"}</h3>
        <p>{transcript}</p>
      </div>
      </div>
  );
}

export default Sidebar;