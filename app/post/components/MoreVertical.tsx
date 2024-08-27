"use client";

import React, { useState } from "react";
import { MoreVerticalIcon } from "lucide-react";

const MoreVertical = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <MoreVerticalIcon onClick={handleButtonClick} />

      {showPopup && (
        <div className="popupContainer">
          <div className="popup">
            <div className="nickese-upper">Nickese Upper</div>
            <p>helo</p>
            <button onClick={handleCancelClick} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreVertical;
