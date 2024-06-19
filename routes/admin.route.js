const adminController = require('../controllers/UserController');
const mid = require('../middleware/auth');

const express = require('express');
const route = express.Router();

route.post('/admin/register', adminController.createAdmin);
route.post('/admin/login', adminController.loginAdmin);
route.post('/admin/logout',[mid.isLogin, mid.isLogout], adminController.logoutAdmin);

module.exports = route;