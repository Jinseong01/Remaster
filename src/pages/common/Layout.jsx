import React, { Fragment } from "react";
import "./Layout.css";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import pageInfo from "../../data/imageInfo";
import ParallaxLayout from "./parallaxLayout";
import Sidebar from "../../components/side/Sidebar";

function Layout({ loginState, setLogin, currentUser, setCurrentUser }) {
  //useNavigate 훅을 사용하여 리액트의 내비게이션 기능을 통해 페이지 이동
  const navigate = useNavigate();
  const location = useLocation(); // 현재 location 정보

  // 현재 렌더링된 pathname을 찾아서, 해당하는 이미지와 텍스트 가져오기
  const getCurrentComponent = () => {
    const currentPath = location.pathname;
    let findPagesInfo = Object.keys(pageInfo).reduce((find, info) => {
      return info === currentPath ? pageInfo[info] : find;
    }, []);
    console.log(`getCurrentComponent호출 결과 ${findPagesInfo}`);
    return findPagesInfo;
  };

  const [imageSrc, title] = getCurrentComponent();

  //아래 상황에서 주의사항이 있다.
  //  /, /program, /work 등과 같은  Layout의 children으로 넘어갈 때는
  // Layout이 언마운트 되지 않고 업데이트 된다!
  //반면 Layout의 children이 아닌 완전 다른 라우트라면 Layout은 언마운트되고
  //새로운 컴포넌트가 마운트된다. 예를들어 /login하면
  //Layout은 언마운트되고 <LoginPage>가 마운트된다.
  //왜 주의해야하냐면, 나중에 프로그램신청하다가, 메인페이지로 넘어가면, 프로그램신청->메인페이지가
  //둘다 Layout의 children으로 있다면 중간에 프로그램신청한(중간내용/즉, 중간에 작성하다가 메인페이지로 넘어갔을 때) 언마운트가 아닌 업데이트되므로, 중간 내용이
  //초기화가 안될 수 있다는 점. 이를 해결하기 위해서는 useEffect를 사용해서 cleanup함수에 초기화하는 함수를 작성하도록 한다.
  return (
    <div>
      <nav className="navigation-bar">
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <div className="logo-container">
              <img
                src="/assets/images/logo/myLogo.png"
                alt="ReLife"
                className="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
              <Link to="/program" className="nav-link">
                프로그램
              </Link>
              <Link to="/support" className="nav-link">
                활동보조
              </Link>
              <Link to="/jobs" className="nav-link">
                일자리
              </Link>
              <Link to="/notice" className="nav-link">
                공지사항
              </Link>
              <Link to="/schedule" className="nav-link">
                개인일정
              </Link>
              <Link to="/mypage" className="nav-link">
                마이페이지
              </Link>
            </div>

            {/* User Info */}
            <div className="user-info">
              {loginState ? (
                <div className="logout">
                  <span>{currentUser.name}님</span>
                  <div
                    style={{
                      marginLeft: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setLogin(false);
                      setCurrentUser({});
                      navigate("/");
                    }}
                  >
                    <LogOut size={17} />
                    <span className="loginout">로그아웃</span>
                  </div>
                </div>
              ) : (
                <div
                  className="login"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <LogIn size={17} />
                  <span className="loginout">로그인</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentUser && Object.keys(currentUser).length > 0 && (
            <Sidebar currentUser={currentUser} />
        )}
        <ParallaxLayout backgroundImage={imageSrc} heroTitle={title} />
        <div className="content-section">
          <div className="outlet-container">
            <Outlet />{" "}
            {/* 필요한 내용이 있다면 <Outlet context={{ imageSrc, title }} /> 로 전달 */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
