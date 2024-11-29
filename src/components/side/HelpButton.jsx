import React, { useState } from "react";
import "./HelpButton.css";

const HelpDialog= ({currentUser})=>{
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스

    // 이미지 배열
    const images = [
        "/assets/images/help/1.png",
        "/assets/images/help/2.png",
        "/assets/images/help/3.png",
    ];

        // 이전 이미지로 이동
    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex // 첫 번째 이미지에서 멈춤
        );
    };

    // 다음 이미지로 이동
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex // 마지막 이미지에서 멈춤
        );
    };

        // 도움말 다이얼로그 열기/닫기 핸들러
    const toggleHelpDialog = () => {
        setIsHelpOpen(!isHelpOpen);
        console.log(currentUser);
    };

    return (
        <>
            <div className="help-button-button-and-text">
                <button className="help-button" onClick={toggleHelpDialog}>
                <img
                    src="/assets/images/program/guidelogo.png"
                    alt="도움말"
                    className="help-button-image"
                />
                </button>
                <p className="help-button-button-and-text-text"></p>
            </div>

            {isHelpOpen && (
                <div className="help-dialog-overlay" onClick={toggleHelpDialog}>
                    <div className="help-dialog-background">
                        <div className="logo-and-h2">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/program/guidelogo.png`} alt="로고 이미지" className="logo" />
                            <h2>어떤 기능인가요?</h2>
                        </div>


                        <div className="help-dialog-right-and-left">
                            {/* 이전 버튼 */}
                            <img
                                src={
                                      currentImageIndex === 0
                                      ? "/assets/images/help/block.png" // 1번 페이지에서는 block.png
                                      : "/assets/images/sidebar/reduce.png"
                                }
                                className="help-dialog-right-and-left-img"
                                alt="이전"
                                onClick={(e) => {
                                    e.stopPropagation(); // 이벤트 버블링 방지
                                    if (currentImageIndex > 0) handlePrevious(); // 조건에 따라 동작
                                }}
                            />

                            <div className="help-dialog" onClick={(e) => e.stopPropagation()}>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`도움말 ${currentImageIndex + 1}`}
                                />
                            </div>

                            {/* 다음 버튼 */}
                            <img
                                src={
                                      currentImageIndex === images.length - 1
                                      ? "/assets/images/help/block.png" // 3번 페이지에서는 block.png
                                      : "/assets/images/sidebar/expand.png"
                                }
                                className="help-dialog-right-and-left-img"
                                alt="다음"
                                onClick={(e) => {
                                    e.stopPropagation(); // 이벤트 버블링 방지
                                    if (currentImageIndex < images.length - 1) handleNext(); // 조건에 따라 동작
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HelpDialog;