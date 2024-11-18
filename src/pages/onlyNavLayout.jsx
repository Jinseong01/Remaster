import React, { Fragment} from 'react';
import { Outlet ,Link ,useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';
import "./Layout.css"//네비 스타일만 가져오기

let OnlyNavLayout=({loginState,setLogin,currentUser,setCurrentUser})=>{
  //useNavigate 훅을 사용하여 리액트의 내비게이션 기능을 통해 페이지 이동
  const navigate = useNavigate();
  

  return (
    <div>
      <nav className="navigation-bar">
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <div className="logo-container">
              <img 
                src="/myLogo.png" 
                alt="ReLife" 
                className="logo"
                onClick={()=>{
                    navigate("/");
                }}
              />
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
            <Link to="/program?data=123&data2=456" className="nav-link">프로그램</Link>
            <Link to="/activity" className="nav-link">활동보조</Link>
            <Link to="/work" className="nav-link">일자리</Link>
            <Link to="/notice" className="nav-link">공지사항</Link>
            <Link to="/personal" className="nav-link">개인일정</Link>
            <Link to="/mypage" className="nav-link">마이페이지</Link>
            </div>

            {/* User Info */}
            <div className="user-info">
            {loginState ? (
                <div className='logout'>
                  <span>{currentUser.name}님</span>
                  <div style={{marginLeft:"1.2rem", display:"flex", alignItems:"center"}} onClick={()=>{setLogin(false);setCurrentUser({});navigate("/")}}>
                    <LogOut size={17}/>
                    <span className="loginout">로그아웃</span>
                  </div>
                </div>
              ) : (
                <div className="login" onClick={()=>{navigate("/login");}}>
                  <LogIn size={17}/>
                  <span className="loginout">로그인</span>
                </div>
              )
              } 
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
            <Outlet /> {/* 필요한 내용이 있다면 <Outlet context={{ imageSrc, title }} /> 로 전달 */}
      </main>
    </div>
  );
}

export default OnlyNavLayout;