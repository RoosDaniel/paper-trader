const Router = require('koa-router');
const sessionControllers = require('../controllers/session');
const authControllers = require('../controllers/auth');


const {
  jwtAuth,
} = authControllers;

const {
  createSession,
  getSession,
  createTransaction,
} = sessionControllers;

const router = new Router({ prefix: '/session' });

router.post('/', jwtAuth, createSession);
router.get('/:id', jwtAuth, getSession);
router.post('/:id/transactions', jwtAuth, createTransaction);

module.exports = router;
