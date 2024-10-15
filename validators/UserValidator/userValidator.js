const { body, validationResult } = require('express-validator');

const userValidator = [
  body('username')
    .notEmpty().withMessage('Username is required.')
    .isLength({ max: 50 }).withMessage('Username must be at most 50 characters long.'),
  
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  
  body('role')
    .optional()
    .isIn(['user', 'admin', 'super_admin']).withMessage('Role must be one of user, admin, or super_admin.')
];


const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { userValidator, validateUser };
