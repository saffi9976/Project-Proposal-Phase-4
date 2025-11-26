require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const jobPostingRoutes = require('./modules/jobPostings/routes/routes');
const connectDB = require("./shared/middlewares/connect-db");

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());
app.use(connectDB);
app.use('/api/job-postings', jobPostingRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
