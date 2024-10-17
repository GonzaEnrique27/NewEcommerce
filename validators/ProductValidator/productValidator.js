const { body, validationResult } = require('express-validator');

const productValidator = [
  body('name')
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters long.'),
  
  body('description')
    .notEmpty().withMessage('Description is required.')
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters long.'),
  
  body('image_url')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL.'),
  
  body('price')
    .notEmpty().withMessage('Price is required.')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
  
  body('brand_id')
    .notEmpty().withMessage('Brand ID is required.')
    .isInt().withMessage('Brand ID must be an integer.')
];

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


module.exports = { productValidator, validateProduct };
