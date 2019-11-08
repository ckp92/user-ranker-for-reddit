const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// sender name, sender email, subject, body, dateTime
mongoose.model('emails', EmailSchema);
