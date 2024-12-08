import React, { useState, useEffect } from "react";
import "./category.css";
import Tasks from "../../tasks/task";
import Portal from "../../../../services/Portal";
import TaskCreate from "../../../createTask/createTask";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTasks } from "../../../../store/slices/TasksState";
import AddIcon from "../../../../assets/headerFilters/add-square.png";
export default function Category() {
  // const [taskData, setTaskData] = useState([]);
  const taskData = useSelector((state) => state.TasksStateSlice.filteredTasks);
  const [dummy, setDummy] = useState([
    { category: "To Do" },
    { category: "In Progress" },
    { category: "Done" },
  ]);
  const [toggleStateForTaskCreate, setToggleStateForTaskCreate] =
    useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const dispatch = useDispatch();

  const fetchTasksAPI = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(
       `${process.env.REACT_APP_BASE_URL_PORT}/api/task/fetch`,
        { userId: user.userId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const tasks = response.data.tasks.reduce(
        (acc, task) => {
          const category = acc.find((cat) => cat.category === task.category);
          if (category) {
            category.items.push(task);
          }
          return acc;
        },
        [
          { category: "To Do", items: [] },
          { category: "In Progress", items: [] },
          { category: "Done", items: [] },
        ]
      );

      dispatch(addTasks(tasks));
      // setTaskData(tasks);
      // setTaskData(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Network error");
    }
  };

  const updateCategoryThroughDragAPI = async (taskId, category) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
       `${process.env.REACT_APP_BASE_URL_PORT}/api/task/update-category`,
        { taskId, category, updatedBy: user.userId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      await fetchTasksAPI();
    } catch (error) {
      console.error("Error updating task category:", error);
      alert("network error");
    }
  };

  useEffect(() => {
    fetchTasksAPI();
  }, []);

  const handleDragStart = (e, task, categoryIndex) => {
    setDraggedTask({ task, categoryIndex });
    e.target.classList.add("dragging");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.target.classList.remove("drag-over");
  };

  const handleDrop = (e, targetCategoryIndex) => {
    e.preventDefault();
    e.target.classList.remove("drag-over");

    if (draggedTask) {
      const { task, categoryIndex: sourceCategoryIndex } = draggedTask;

      if (targetCategoryIndex !== sourceCategoryIndex) {
        const updatedTaskData = taskData.map((category) => ({
          ...category,
          items: [...category.items],
        }));

        const updatedCategory = updatedTaskData[targetCategoryIndex].category;

        updatedTaskData[sourceCategoryIndex].items = updatedTaskData[
          sourceCategoryIndex
        ].items.filter((item) => item._id !== task._id);

        updatedTaskData[targetCategoryIndex].items.push(task);

        dispatch(addTasks(updatedTaskData));

        updateCategoryThroughDragAPI(task._id, updatedCategory);
      }
    }
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  const toggleHandleTaskCreate = () => {
    setToggleStateForTaskCreate(!toggleStateForTaskCreate);
  };

  return (
    <>
      {toggleStateForTaskCreate && (
        <Portal
          close={toggleHandleTaskCreate}
          component={
            <TaskCreate
              close={toggleHandleTaskCreate}
              onTaskCreated={fetchTasksAPI}
            />
          }
        />
      )}
      <div className="category_container">
        {taskData.map((category, categoryIndex) => (
          <div
            key={category.category}
            className={`category_card ${category.category.toLowerCase()}_category`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, categoryIndex)}
          >
            <div className="category_header">
              {console.log(category.category.toLowerCase())}
              <div
                className={`circular_dot ${category.category.toLowerCase()}`}
              ></div>
              <div className="category_heading">{category.category}</div>
              <div className="count_div">{category.items.length}</div>
              {category.category === "To Do" && (
                <>
                  <div className="dummy"></div>
                  <div className="add_tasks" onClick={toggleHandleTaskCreate}>
                    <img
                      alt="add_btn_in_categor"
                      style={{ width: "2.5vh", cursor: "pointer" }}
                      src={AddIcon}
                    />
                  </div>
                </>
              )}
            </div>
            {category.category === "To Do" && (
              <div
                className="horizontal_line"
                style={{ backgroundColor: "#ff6b6b" }}
              ></div>
            )}
            {category.category === "In Progress" && (
              <div
                className="horizontal_line"
                style={{ backgroundColor: "#f9a825" }}
              ></div>
            )}
            {category.category === "Done" && (
              <div
                className="horizontal_line"
                style={{ backgroundColor: " #4caf50" }}
              ></div>
            )}
            <div className="task_box">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, categoryIndex)}
                  onDragEnd={handleDragEnd}
                >
                  <Tasks data={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
