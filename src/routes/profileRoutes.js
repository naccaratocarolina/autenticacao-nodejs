const { Router } = require('express');
const authenticatedMiddleware = require('../middlewares/authenticated');
const router = Router();

router.get('/', authenticatedMiddleware, (req, res) => {
  res.render('profile', { user: req.user, token: null });
});

module.exports = router;
