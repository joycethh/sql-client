import React from "react";
import FaceOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./rightbar.scss";
const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>You may also like</span>
          <div className="suggestedUser">
            <div className="userInfo">
              <FaceOutlinedIcon />
              <span>Jane Doe</span>
            </div>
            <div className="actions">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>

          <div className="suggestedUser">
            <div className="userInfo">
              <FaceOutlinedIcon />
              <span>John Doe</span>
            </div>
            <div className="actions">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
