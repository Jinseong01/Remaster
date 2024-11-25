import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { Card } from '../../components/ui/card';
import notices from '../../data/notice';
import {useNavigate } from 'react-router-dom';
import "./mainpage.css"
import programs from '../../data/program';
import jobs from '../../data/jobs';

import { AlertCircle, Briefcase, Users, Clock, MapPin, Calendar } from 'lucide-react';



const MainPage = ({currentUser,loginState}) => {
  
const navigate = useNavigate();

    
//==공지사항 관련==    
// 먼저 날짜순 정렬
const sortedNotices = notices.sort((a, b) => new Date(b.date) - new Date(a.date));
// 최신 5개만 선택
const recentNotices = sortedNotices.slice(0, 5);
// 현재 공지사항 보여주는 상태
const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);


  // 5초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % recentNotices.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // 이전 공지사항
  const prevNotice = () => {
    setCurrentNoticeIndex((prev) => 
      prev === 0 ? recentNotices.length - 1 : prev - 1
    );
  };

  // 다음 공지사항
  const nextNotice = () => {
    setCurrentNoticeIndex((prev) => 
      (prev + 1) % recentNotices.length
    );
  };

  return (
    <div className="w-[100%] mx-auto p-4">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {currentNoticeIndex + 1} / {recentNotices.length}
              </span>
              <div className="flex space-x-1">
                <button 
                  onClick={prevNotice}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button 
                  onClick={nextNotice}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden" style={{ height: '60px' }}>
            <div 
              className="transition-transform duration-500 ease-in-out absolute w-full"
              style={{ transform: `translateY(-${currentNoticeIndex * 60}px)` }}
            >
              {recentNotices.map((notice, index) => (
                <div 
                  key={index}
                  className="h-[60px] flex items-center cursor-pointer hover:bg-gray-50 transition-colors px-3 rounded-lg"
                  onClick={() => navigate(`/notice?id=${notice.id}`)}
                >
                  <span className="text-sm text-gray-500 min-w-[100px]">{notice.writer}</span>
                  <span className="ml-2 flex-1 text-sm text-gray-800 truncate">{notice.title}</span>
                  <span className="text-sm text-gray-500 ml-2">{notice.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className='calenderAndDeadlineNotice'>
            <div className='calenderWrapper'>
                {
                    loginState?
                     (
                        <p>{currentUser.name}님에 대한 캘린더 정보 보여주기</p>
                     ) :
                     (
                        <p>로그인을 안한 상태의 기본 캘린더 보여주기</p>
                     )
                }
            </div>
            <div className='deadlineNoticeWrapper'>
            <DeadlineNotice />
            </div>
      </div>
    </div>
  );

};



const DeadlineNotice = () => {
    // 프로그램 정원 비율로 정렬 (남은 자리가 적은 순)
    const sortedPrograms = [...programs]
      .sort((a, b) => (a.now_capacity/a.max_capacity) - (b.now_capacity/b.max_capacity))
      .slice(0, 4);
  
    // 현재 날짜 기준으로 마감일이 가까운 순으로 정렬
    const currentDate = new Date();
    const sortedJobs = [...jobs]
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 4);
  
    return (
      <div className="space-y-6">
        {/* 신청기한 마감 임박 일자리 */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-lg">신청기한 마감 임박 일자리</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sortedJobs.map(job => {
              const daysLeft = Math.ceil((new Date(job.deadline) - currentDate) / (1000 * 60 * 60 * 24));
              return (
                <div 
                  key={job.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={()=>console.log(`일자리페이지로 이동 아이디 ${job.id}`)}
                >{/* 이제 여기다가 만든 onclick시 job.id를 넘겨주면서 링크이동!*/}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{job.company}</span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                      D-{daysLeft}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="truncate">{job.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{job.location}</span>
                  </div>  

                </div>
                
              );
            })}
          </div>
        </Card>
  
        {/* 정원 마감 임박 프로그램 */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-lg">정원 마감 임박 프로그램</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sortedPrograms.map(program => {
              const remainingSpots = program.max_capacity - program.now_capacity;
              const capacityPercentage = (program.now_capacity / program.max_capacity) * 100;
              return (
                <div 
                  key={program.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={()=>console.log(`프로그램페이지로 이동 아이디 ${program.id}`)}
                >{/* 이제 여기다가 만든 onclick시 program.id를 넘겨주면서 링크이동!*/}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm truncate">
                    {program.title.length > 13 ? program.title.substring(0, 11) + "..." : program.title}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                      잔여 {remainingSpots}석
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>{program.time}</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${capacityPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

export default MainPage;