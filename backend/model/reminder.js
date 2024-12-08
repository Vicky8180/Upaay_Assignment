const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Reference to Task
  reminderDate: {
    type: Date,
    required: true, // The date when the reminder should trigger
  },
  reminderMessage: {
    type: String,
    default: 'Reminder: Your task is due soon!',
  },
  sent: { type: Boolean, default: false }, // Whether the reminder has been sent
});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
