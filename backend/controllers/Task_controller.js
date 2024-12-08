const Task = require("../model/taskModel");
const User = require("../model/userModel");
const ActivityLog = require("../model/activityLogModel");

function formatTimeToAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

function formatDateToYMD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, assignees, createdBy } =
      req.body;

    if (!title || !description || !createdBy) {
      return res
        .status(400)
        .json({ message: "Title, description, and createdBy are required" });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      assignees,
      createdBy,
      activityLog: [],
    });

    await task.save();

    const creator = await User.findById(createdBy);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    creator.tasks.push(task._id);
    await creator.save();

    if (assignees && assignees.length > 0) {
      await User.updateMany(
        { _id: { $in: assignees } },
        { $push: { tasks: task._id } }
      );
    }

    const currentTime = new Date();
    const formattedDate = formatDateToYMD(currentTime); // Get the date in YYYY-MM-DD format
    const formattedTime = formatTimeToAMPM(currentTime); // Get the time in AM/PM format

    const newActivity = new ActivityLog({
      taskId: task._id,
      action: "Created",
      details: `${task.title} task has been successfully created by ${creator.name}, who is responsible for this task, on ${formattedDate}.`, // Dynamic date and time
      name: creator.name,
      creator: creator._id,
      timestamp: currentTime,
    });

    await newActivity.save();
    console.log("Activity log created successfully");

    task.activityLog.push(newActivity._id);
    await task.save();

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.error("Error creating task:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const fetchTasks = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userWithTasks = await User.findById(userId).populate({
      path: "tasks",
      populate: {
        path: "activityLog",
      },
    });

    if (!userWithTasks) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: userWithTasks.tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { taskId, category, updatedBy } = req.body;

    if (!taskId || !category || !updatedBy) {
      return res
        .status(400)
        .json({ message: "taskId, category, and updatedBy are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { category },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updater = await User.findById(updatedBy);
    if (!updater) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTime = new Date();
    const formattedDate = formatDateToYMD(currentTime); // Get the date in YYYY-MM-DD format
    const formattedTime = formatTimeToAMPM(currentTime); // Get the time in AM/PM format

    const newActivity = new ActivityLog({
      taskId: updatedTask._id,
      action: "Status Changed",
      details: `The category of the ${updatedTask.title} task has been successfully updated to ${category} by ${updater.name}, on ${formattedDate} at ${formattedTime}.`, // Dynamic date and time
      name: updater.name,
      creator: updater._id,
      timestamp: currentTime,
    });

    await newActivity.save();

    updatedTask.activityLog.push(newActivity._id);
    await updatedTask.save();

    return res.status(200).json({
      message: "Category updated successfully",
      task: updatedTask,
      activityLog: newActivity,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = { createTask, fetchTasks, updateCategory };
