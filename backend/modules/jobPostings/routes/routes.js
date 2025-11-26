const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/controller');
const { validateJobPosting } = require('../../../shared/middlewares/validation');

router.get('/', jobPostingController.getAllJobPostings);
router.get('/:id', jobPostingController.getJobPostingById);
router.post('/', validateJobPosting(false), jobPostingController.addJobPosting);
router.put('/:id', validateJobPosting(true), jobPostingController.updateJobPosting);
router.delete('/:id', jobPostingController.deleteJobPosting);

module.exports = router;
