// require installed express router
const router = require('express').Router();

// require installed api routes
const apiRoutes = require('./api');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

// error message if user navigates to any other route
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

// export router
module.exports = router;