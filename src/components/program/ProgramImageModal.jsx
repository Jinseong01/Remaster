import React, { useState} from "react";
import "./ProgramImageModal.css";

const ProgramImageModal=({ isOpen, onClose, image })=>{

    if (!isOpen) return null; // isOpen이 false일 경우 렌더링하지 않음

    return (
        <div className="program-image-modal" onClick={onClose}>
        <div className="program-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={image} alt="확대된 이미지" />
        </div>
        </div>
    );
}

export default ProgramImageModal;