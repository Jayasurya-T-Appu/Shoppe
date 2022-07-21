const express = require('express') 
const router = express.Router()
const userController = require('../controllers/User.controller')
const jwt = require('../helper/jwt_bcrypt.helper')

const tokenMW = (req, res, next) => {
    let decode = jwt.tokenVerify(req, res);
    if (decode.decoded) {
      console.log(decode);
      next();
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: "Unauthorized",
      });
    }
  };
  

//User Routes GET user, POST user, PUT user, DELETE user
router.get('/',(req,res )=>{
    userController.getUser(req, res)
})


router.post('/',(req,res )=>{
    userController.createUser(req, res)
})


router.get('/id/:id',(req,res )=>{
    userController.getUserById( req, res ) 
})


router.patch('/id/:id',(req, res, next)=>{
    tokenMW(req, res, next)
},(req,res )=>{
    userController.updateUser(req, res)
})


router.delete('/id/:id',(req, res, next)=>{
    tokenMW(req, res, next)
},(req,res )=>{
    userController.deleteUser(req, res)
})



/* router.route('/')


router.use((req, res, next) => {
  let decode = jwt.tokenVerify(req, res);
  if (decode.decoded) {
    next();
  } else {
    return res.status(404).json({
      status: "ERROR",
      message: "Unauthorized",
    });
  }
});
router.route('/id/:id')   
    .patch((req, res)=> {
        userController.updateUser(req, res)
    })
router.route('/id/:id')   
    .delete((req, res)=> {
        userController.deleteUser(req, res)
    })
 */

module.exports = router