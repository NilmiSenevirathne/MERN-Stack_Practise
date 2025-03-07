const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/users', controller.getUsers);
router.post('/createUser', controller.addUser);
router.post('/updateUser', controller.updateUser);
router.post('/deleteUser',controller.deleteUser);

module.exports = router;