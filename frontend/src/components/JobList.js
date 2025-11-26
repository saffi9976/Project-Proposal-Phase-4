import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/job-postings");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/job-postings/${id}`);
      setJobs(jobs.filter((job) => Number(job.job_id) !== Number(id)));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="job-list">
      <h1>Job Postings</h1>
      {jobs.map((job) => (
        <div className="job-card" key={job.job_id}>
          <div className="job-details">
            <h2>{job.title} at {job.company_name}</h2>
            <p>{job.location}</p>
          </div>
          <div className="job-actions">
            <button className="edit-btn" onClick={() => handleEdit(job.job_id)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(job.job_id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobList;