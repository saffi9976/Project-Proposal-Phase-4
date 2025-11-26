const { Schema, model } = require("mongoose");

const JobPostingSchema = new Schema({
  job_id: { type: Number, required: true, unique: true },
  company_name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  max_salary: { type: Number, min: 0 },
  med_salary: { type: Number, min: 0 },
  pay_period: { type: String, enum: ["Hourly", "Weekly", "Monthly", "Yearly"] },
  location: { type: String, required: true, trim: true },
  company_id: { type: Number },
  views: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

module.exports = model("JobPosting", JobPostingSchema);
