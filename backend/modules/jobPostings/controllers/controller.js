const JobPosting = require("../models/posting");

const getAllJobPostings = async (req, res) => {
  try {
    const search = req.query.search || "";
    const sortField = req.query.sortBy || "job_id";
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { company_name: { $regex: search, $options: "i" } }
      ]
    };
    const jobs = await JobPosting.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch job postings" });
  }
};

const getJobPostingById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const job = await JobPosting.findOne({ job_id: id });
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving job" });
  }
};

const addJobPosting = async (req, res) => {
  try {
    const last = await JobPosting.findOne().sort({ job_id: -1 });
    const nextId = last ? last.job_id + 1 : 1;
    const job = await JobPosting.create({ ...req.body, job_id: nextId });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to add job" });
  }
};

const updateJobPosting = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const job = await JobPosting.findOneAndUpdate(
      { job_id: id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update job" });
  }
};

const deleteJobPosting = async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("Deleting job with job_id:", id);
    const job = await JobPosting.findOneAndDelete({ job_id: id });
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", job });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  getAllJobPostings,
  getJobPostingById,
  addJobPosting,
  updateJobPosting,
  deleteJobPosting,
};
