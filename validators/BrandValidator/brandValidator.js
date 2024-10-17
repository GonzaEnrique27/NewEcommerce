const { body, validationResult } = require('express-validator');

const brandValidator = [
  body('name')
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters long.'),
  
  body('logo_url')
    .optional()
    .isURL().withMessage('Logo URL must be a valid URL.')
];


const validateBrand = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pochitamadev.store');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { brandValidator, validateBrand };
