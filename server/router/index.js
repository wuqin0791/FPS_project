const rootRouter = require('koa-router')();
const router = require('koa-router')();
const controller = require('../controller');
const middleware = require('../middleware');

router.get('/auth', controller.Login.checkAuth);
router.post('/login', controller.Login.login);
router.post('/logout', controller.Login.logout);
router.post('/register', controller.Login.register);

router.get('/stores', controller.Store.list);
router.post('/stores', middleware.checkIp, controller.Store.create);
router.get('/products/:id', controller.Store.show);
router.del('/stores/:id', middleware.checkIp, controller.Store.remove);

router.get('/products', controller.Product.list);
router.get('/stores/:store_id/products', controller.Product.list);
router.get('/products/:id', controller.Product.show);
router.post('/products', middleware.checkIp, controller.Product.create);
router.del('/products/:id', middleware.checkIp, controller.Product.remove);

router.get('/orders/:id', controller.Order.show);
router.get('/orders', controller.Order.list);
router.post('/orders', controller.Order.create);
// router.post('/orders/status', controller.Order.updateStatus);
router.post('/orders/:id/remark', controller.Order.updateRemark);

router.get('/qiniu-token', controller.qiniu.getToken);
router.post('/tools/export', middleware.json2csv);

rootRouter.use('/api-7din', middleware.checkAuth, router.routes(), router.allowedMethods());
rootRouter.post('/orders/status', controller.Order.updateStatus);

module.exports = rootRouter;
