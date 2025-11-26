import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/job-postings")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2000);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/job-postings/${id}`);
      setJobs(jobs.filter(job => job.job_id !== id));
      showNotification("Successfully deleted job!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Job Postings</h1>
        <Link to="/create">Create New Job</Link>
      </header>

      {notification && <div className="popup-notification">{notification}</div>}

      <div className="job-list">
        {jobs.map(job => (
          <div className="job-card" key={job.job_id}>
            <div className="job-details">
              <h2>{job.title} at {job.company_name}</h2>
              <p>Location: {job.location}</p>
            </div>
            <div className="job-actions">
              <button className="edit-btn" onClick={() => handleEdit(job.job_id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(job.job_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
