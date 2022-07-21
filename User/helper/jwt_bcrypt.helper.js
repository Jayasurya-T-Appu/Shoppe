const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET = process.env.JWT_SECRET
const JWT_bcrypt_Helper = {
   async hashPassword(body){
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(body.password,salt)
        let data = {
            ...body,
            password:hashPassword
        }
        return data
    },
    async validatePass(password, dbPassword){
        let authenticate = await bcrypt.compare(password, dbPassword)
        return authenticate
    } 
    ,

    tokenGen(body){
        if(body){
            let token = jwt.sign({name:body.name,email:body.email, phone:body.phone, role:body.role}, SECRET)
            let data = {
                ...body,
                token: token
            }
           
            return data
        } 
    },

  tokenVerify( req, res ){
    if(req.headers.authorization){
      let token = req.headers.authorization.split(" ")[1]
      let resultData = jwt.verify(token, SECRET, (err, decoded)=>{
            if (err) {
              return (
                result = {
                decoded: false,
                data: decoded,
              });
            }
            return (
              result = {
              decoded: true,
              data: decoded,
            });
            
        })
        return resultData
    }
    return (
      result = {
      decoded: false,
    });
    
    } 

}

module.exports = JWT_bcrypt_Helper