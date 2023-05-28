const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middlewares/verifyJWT')

// router.use(verifyJWT)

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router
