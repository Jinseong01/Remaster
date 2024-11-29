// App.jsx (라우터 설정)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { PersonalPage } from "./pages/Pages";
import { useState } from "react";
import LoginPage from "./pages/login/loginpage";
import SignUpPage from "./pages/login/signuppage";
import { users } from "./data/users";
import OnlyNavLayout from "./pages/onlyNavLayout";
import MainPage from "./pages/main/mainpage";
import NoticePage from "./pages/notice/noticepage";
import JobsPage from "./pages/job/JobsPage";
import JobDetailPage from "./pages/job/JobDetailPage";
import Program from "./pages/program/Program";
import ProgramApply from "./pages/program/ProgramApply";
import SchedulePage from "./pages/schedule/SchedulePage";

import SupportPage from "./pages/Support/SupportPage";
// MyPage 관련 import
import MyPage from "./pages/My/MyPage";
import MyPageInfo from "./pages/My/MyPageInfo/MyPageInfo";
import Timeline from "./pages/My/Timeline/Timeline";
import SubResultPage from "./pages/My/SubResultPage/SubResultPage";
import ProgramResult from "./pages/My/SubResultPage/ProgramResult/ProgramResult";
import SupportResult from "./pages/My/SubResultPage/SupportResult/SupportResult";
import JobResult from "./pages/My/SubResultPage/JobResult/JobResult";

//router
//아래 코드를 제대로 이해할 필요가 있다.
//아래 코드는 / 이것은 기본적으로 Layout을 보여준다.
//또한 중요한 점은 children부분에 해당하는 path경로가 들어오면
//Layout의 Outlet에 대입된다는 것이다!!
//예시로 만약 /program이라고 하면,
//Layout을 보여주고, Layout안에 있는 Outlet에 ProgramPage가 대입되어
//최종적으로 상단바는 고정되고 내용이 계속 변해지는 구조를 만들 수 있다.
//그래서 전체적인 틀이라고 해서 Layout으로 이름을 지엇다.

function App() {
  //login이 true라면 로그인 상태 false라면 로그아웃상태
  const [login, setLogin] = useState(false);
  //현재 로그인한 사용자가 정보
  const [currentUser, setCurrentUser] = useState({});
  //유저들의 정보
  const [allUsers, setallUsers] = useState(users); //사용자들 정보 배열

  //지금 주의사항은  총 경우의 수가 3가지이다.
  //1번 : 네비바 + 이미지 스크롤 program,work,activity...mypage인 경우처럼 네비바도 있고 이미지도 정해진 페이지이다.
  //2번 : 네비바만 필요! (이미지 스크롤 필요없음) 대표적인 예시가 일자리 신청 페이지 부분이다.
  //3번 : 네비바 , 이미지 스크롤 둘 다 필요없는 경우 예를들어 로그인,회원가입 화면이다.
  //2번을 WorkApplicationPage 예시를 한번 만들어보겠다.
  const router = createBrowserRouter([
    {
      path: "/", //네비바 + 이미지 스크롤
      element: (
        <Layout
          loginState={login}
          setLogin={setLogin}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ),
      children: [
        {
          index: true, // index route 추가
          element: <MainPage currentUser={currentUser} loginState={login} />, // '/' 경로일 때 보여질 컴포넌트
        },
        {
          path: "program", // /program
          element: <Program currentUser={currentUser}/>,
        },
        {
          path: "apply", // /program
          element: (
            <ProgramApply
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          ),
        },
        {
          path: "jobs",
          element: <JobsPage />,
        },
        {
          path: "support",
          element: (
            <SupportPage
              currentUser={currentUser}
              loginState={login}
              setCurrentUser={setCurrentUser}
            />
          ),
        },
        {
          path: "notice",
          element: <NoticePage />,
        },
        {
          path: "schedule",
          element: <SchedulePage 
            currentUser={currentUser}
            loginState={login}
            setCurrentUser={setCurrentUser}
            />,
        },
        {
          path: "mypage",
          element: (
            <MyPage
              currentUser={currentUser}
              loginState={login}
              setCurrentUser={setCurrentUser}
            />
          ),
        },
      ],
    },
    {
      path: "/login", //로그인 시, 현재 사용자 정보가 바뀌어야함
      element: (
        <LoginPage
          setCurrentUser={setCurrentUser}
          allUsers={allUsers}
          setLogin={setLogin}
        />
      ),
    },
    {
      path: "/signup", //회원가입 시 사용자들 정보가 바뀌어야 함.
      element: <SignUpPage allUsers={allUsers} setallUsers={setallUsers} />,
    },
    {
      path: "/",
      element: (
        <OnlyNavLayout
          loginState={login}
          setLogin={setLogin}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ), // 네비게이션만 있는 레이아웃
      children: [
        {
          path: "job/:id", // /job/{id} 로  url이 되는것!!
          element: (
            <JobDetailPage
              currentUser={currentUser}
              loginState={login}
              setCurrentUser={setCurrentUser}
            />
          ),
        },
        // {
        //   path: "b",  // /onlyNav/b
        //   element: <PageB />
        // }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App; // 추가
