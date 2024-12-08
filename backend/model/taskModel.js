const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'], 
      default: 'To Do',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    activityLog: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityLog',
    }],
    priority: {
      type: String,
      enum: ['Low', 'Completed', 'High'], 
      default: 'Low',
    },
  
  },
  {
    timestamps: true, 
  }
);

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Task = mongoose.model('Task', taskSchema);
  module.exports = Task;
