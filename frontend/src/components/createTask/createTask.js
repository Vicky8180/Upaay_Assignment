import React, { useState } from "react";
import "./createTask.css";
import AssignTo from "../../services/AssignTo";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateTask({ close, onTaskCreated }) {
  const [titleInput, setTitleInput] = useState("");
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState([
    { name: "Anoop Yadav" },
    { name: "Vicky" },
  ]);
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const assignList = useSelector((state) => state.AssignList).assignList;
  const assigneesID = assignList.map((item) => item._id);
  const user = JSON.parse(localStorage.getItem("user"));


  const navigate = useNavigate();
  const createTaskAPI = async () => {
    try {
      setLoading(true);
      const payload = {
        title: titleInput,
        description,
        status: "To Do",
        createdBy: user.userId,
        assignees: assigneesID,
        activityLog,
        priority: selectedPriority,
      };



      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/task/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    
      if (response.status === 201) {
        onTaskCreated();
        close();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };

  const handleSaveClick = () => {
    createTaskAPI();
  };

  return (
    <div className="create_container">
      <div className="add_title">
        <label>Title</label>
        <input
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Type Title"
          type="text"
        />
      </div>

      <div className="select_priority">
        <label>Select Priority: </label>
        <div className="selection_list">
          <div
            style={{
              border: selectedPriority === "Low" ? "1px solid #00796b" : "",
            }}
            className={`low_priority ${
              selectedPriority === "Low" ? "selected" : ""
            }`}
            onClick={() => handlePriorityClick("Low")}
          >
            <span className="circular_dot"></span> Low Priority
          </div>
          <div
            style={{
              border: selectedPriority === "High" ? "1px solid red" : "",
            }}
            className={`high_priority ${
              selectedPriority === "High" ? "selected" : ""
            }`}
            onClick={() => handlePriorityClick("High")}
          >
            <span className="circular_dot"></span> High Priority
          </div>
          <div
            style={{
              border:
                selectedPriority === "Completed" ? "1px solid #99d19d" : "",
            }}
            className={`done_priority ${
              selectedPriority === "Completed" ? "selected" : ""
            }`}
            onClick={() => handlePriorityClick("Completed")}
          >
            <span className="circular_dot"></span> Done Priority
          </div>
        </div>
      </div>

      <AssignTo assignees={assignees} setAssignees={setAssignees} />

      <div className="description">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add your description"
          className="description_area"
        />
      </div>

      <div className="task_c_footer_part">
        <div className="task_c_footer">
          <div className="task_c_footer_left"></div>
          <div className="task_c_footer_right">
            <button className="task_c_f_r_btn1" onClick={close}>
              Cancel
            </button>
            <button
              className="task_c_f_r_btn2"
              onClick={handleSaveClick}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
