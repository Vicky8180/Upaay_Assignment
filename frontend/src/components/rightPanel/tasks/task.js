import React, { useState } from "react";
import "./task.css";
import user1 from "../../../assets/headerFilters/Ellipse 12.png";
import user2 from "../../../assets/headerFilters/Ellipse 13.png";
import user3 from "../../../assets/headerFilters/Ellipse 14.png";
import comment from "../../../assets/message.png";
import file from "../../../assets/Group 628.png";
import Portal from "../../../services/Portal";
import ActivityLog from "../../activity/activity";
import OptionIcon from "../../../assets/_. ..png";

export default function Task({ data }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify(data));
  };

  const [activity, setActivity] = useState(false);
  const [dummyAssignees, setDummyAssignees] = useState(data.assignees);
  const handleActitvity = () => {
    setActivity(!activity);
  };

  return (
    <>
      {activity && (
        <Portal
          close={handleActitvity}
          component={
            <ActivityLog
              close={handleActitvity}
              activities={data.activityLog}
              selectedTaskId="task1"
            />
          }
        />
      )}
      <div className="task_container" draggable onDragStart={handleDragStart}>
        <div className="task_header">
          {data.priority === "Low" && (
            <div className="display_priority low_priority">{data.priority}</div>
          )}
          {data.priority === "High" && (
            <div className="display_priority high_priority">
              {data.priority}
            </div>
          )}
          {data.priority === "Completed" && (
            <div className="display_priority done_priority">
              {data.priority}
            </div>
          )}
          <div
            className="task_triple_dot_options"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img alt="option_btn" src={OptionIcon} style={{ width: "1.8vh" }} />
          </div>
        </div>
        <div className="task_title">{data.title}</div>
        <div className="task_description">{data.description}</div>
        <div className="task_footer">
          <div className="task_footer_left">
            <div className="list_of_users_icon2">
              <img src={user1} alt="user1" className="user_icon2" />
              <img src={user2} alt="user2" className="user_icon2" />
              <img src={user3} alt="user3" className="user_icon2" />
            </div>
          </div>
          <div className="task_footer_right">
            <div
              className="footer_item"
              onClick={handleActitvity}
              style={{ cursor: "pointer" }}
            >
              <img className="footer_item_img" src={comment} alt="comments" />
              <div className="footer_item_name">{`${data.activityLog.length} Activity`}</div>
            </div>
            <div className="footer_item">
              <img className="footer_item_img" src={file} alt="files" />
              <div className="footer_item_name">0 File</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
