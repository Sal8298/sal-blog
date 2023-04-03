const router = require('express').Router();

const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./api');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;
