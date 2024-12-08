const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  action: {
    type: String,
    enum: ['Status Changed', 'Assigned User', 'Created', 'Updated'],
  },
  details: {
    type: String,
    required: true,
  },
  name:{ type: String},
  creator:{type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
module.exports = ActivityLog;
