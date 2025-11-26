const { body, validationResult } = require('express-validator');

const validateJobPosting = (isUpdate = false) => [
  body('company_name').optional(isUpdate).notEmpty().withMessage('Company is required'),
  body('title').optional(isUpdate).notEmpty().withMessage('Title is required'),
  body('location').optional(isUpdate).notEmpty().withMessage('Location is required'),
  body('description').optional(isUpdate).notEmpty().withMessage('Description is required'),
  body('max_salary').optional(isUpdate).isNumeric().withMessage('Max salary must be a number'),
  body('med_salary').optional(isUpdate).isNumeric().withMessage('Median salary must be a number'),
  body('pay_period').optional(isUpdate).notEmpty().withMessage('Pay period is required'),
  body('views').optional(isUpdate).isInt().withMessage('Views must be an integer'),
  body('company_id').optional(isUpdate).isInt().withMessage('Company ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

module.exports = { validateJobPosting };