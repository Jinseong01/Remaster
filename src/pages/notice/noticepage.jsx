import React, { useState } from 'react';
import { ChevronDown, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../../components/login/card';
import notices from '../../data/notice';
import { useSearchParams } from 'react-router-dom';

const NoticePage = ({currentUser}) => {
  const [searchParams] = useSearchParams();
  const noticeId = searchParams.get('id') ?? -1; //   /program?id=4
  const [expandedId, setExpandedId] = useState(noticeId !== -1 ? parseInt(noticeId) : null); //펼쳐져있는 공지사항의 notice id!!
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 7;

  // 날짜 포맷팅 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 페이지네이션 계산
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedId(null);  // 페이지 변경시 모든 게시글 접기
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 헤더 섹션 */}
      <div className="relative mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">공지사항</h1>
        <p className="text-gray-600">ReLife의 새로운 소식과 안내사항을 확인하세요</p>
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="text-5xl font-bold text-indigo-100">Notice</div>
        </div>
      </div>
      {/* 공지사항 리스트 */}
      <div className="space-y-4">
        {currentNotices.map((notice) => (
          <Card 
            key={notice.id}
            className={`transform transition-all duration-300 hover:shadow-lg ${
              expandedId === notice.id ? 'bg-gray-50 scale-[1.02]' : 'bg-white hover:scale-[1.01]'
            }`}
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-sm mb-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                      {notice.writer}
                    </span>
                    <span className="text-gray-400">
                      {formatDate(notice.date)}
                    </span>
                  </div>
                  <h2 className={`text-lg font-medium transition-colors duration-300 ${
                    expandedId === notice.id ? 'text-blue-600' : 'text-gray-800'
                  }`}>
                    {notice.title}
                  </h2>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  expandedId === notice.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform duration-300 ${
                      expandedId === notice.id ? 'rotate-180 text-blue-600' : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out ${
                expandedId === notice.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="pt-4 mt-4 border-t">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full transition-colors ${
            currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`w-8 h-8 rounded-full transition-all ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full transition-colors ${
            currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default NoticePage;