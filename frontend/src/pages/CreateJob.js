import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company_name: '',
    title: '',
    location: '',
    description: '',
    max_salary: '',
    med_salary: '',
    pay_period: '',
    company_id: '',
    views: 0
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/job-postings", form);
      setSuccess("Successfully added job!");
      setTimeout(() => {
        setSuccess('');
        navigate('/');
      }, 2000);

    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.msg).join(', '));
      } else {
        setError('Error creating job');
      }
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Create Job Posting</h1>
      </header>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company</label>
          <input name="company_name" value={form.company_name} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required/>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Max Salary</label>
            <input name="max_salary" type="number" value={form.max_salary} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Median Salary</label>
            <input name="med_salary" type="number" value={form.med_salary} onChange={handleChange}/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pay Period</label>
            <select name="pay_period" value={form.pay_period} onChange={handleChange} required>
              <option value="">Select Pay Period</option>
              <option value="Hourly">Hourly</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Company ID</label>
            <input name="company_id" type="number" value={form.company_id} onChange={handleChange}/>
          </div>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateJob;
