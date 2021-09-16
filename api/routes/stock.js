const Router = require('koa-router');
const stockControllers = require('../controllers/stock');


const { getStock } = stockControllers;

const router = new Router({ prefix: '/stock' });

router.get('/:symbol', getStock);

module.exports = router;
