const express = require('express') 
const router = express.Router()
const authController = require('../controllers/auth.contoller')
router.route('/signIn')
    .post((req, res)=> {
        authController.signIn(req,res)
    })

module.exports = router