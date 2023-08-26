const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/dashboard', authController.dashboard_get);

router.post('/adminlogin', authController.adminlogin_post);
router.post('/adminsignup', authController.adminsignup_post);

router.get('/logout', authController.logout_get);
router.get('/adminlogout', authController.adminlogout_get);

module.exports = router;