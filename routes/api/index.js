// require express router
const router = require('express').Router();

// require installed api routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// add prefix of `/users` and `/thoughts` to routes created in `userRoutes.js` and `thoughtRoutes.js`
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export router
module.exports = router;