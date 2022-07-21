const UserModel = require('../Models/User.model');
const Jwt_bcrypt = require('../helper/jwt_bcrypt.helper')
const requestValidator = require('../Validators/RequestSchema.validator')
const UserController = {
    getUser( req, res ){
        UserModel.find({})
        .then(users => {
            res.status(200).json({
                status: 'OK',
                message: 'Users fetched successfully',
                data: users
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'ERROR',
                message: 'Users not found',
                error:err
            })
        })
    },

    getUserById(req, res){
        UserModel.findById({_id: req.params.id})
        .then(users => {
            res.status(200).json({
                status: 'OK',
                message: 'User fetched successfully',
                data: users
            });
        })
        .catch(err => {
            res.status(404).json({
                status: 'ERROR',
                message: 'User not found',
                error:err
            })
        })
    },

    async createUser(req, res){
        try {
            await requestValidator.createUserSchema.validateAsync(req.body)
            let validBody = await Jwt_bcrypt.hashPassword(req.body)
            validBody = Jwt_bcrypt.tokenGen(validBody)
            let exist = await UserModel.findOne({ phone: validBody.phone, email:validBody.email})
            if(!exist){
                await UserModel.create(validBody)
                .then((user)=> {
                    res.status(201).json({
                        status: 'OK',
                        message: 'User created successfully',
                        data: user
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        status: 'ERROR',
                        message: 'User not created',
                        error:err.message
                    })
            })
            }
            else {
                return (
                    res.status(409).json({
                        status: 'Duplicate Key',
                        message: 'User Already Exist',
                    }) 
                )
            }
              
    }
        catch(error){
            if(error.isJoi){
                res.status(400).json({
                    status: 'ERROR',
                    message: 'User not created',
                    error:error.message
                })
            }
            res.status(400).json({
                status: 'ERROR',
                message: 'User not created',
                error:error
            })
        }
        
    },

    async updateUser(req, res){
        try {
            let data = {
                ...req.body,
                id:req.params.id
            }
            await requestValidator.updateUserSchema.validateAsync(data)
            UserModel.findOneAndUpdate({_id:req.params.id},req.body, {new: true})
            .then((user)=>{
                if(user){
                    return(
                        res.status(200).json({
                            status: 'OK',
                            message:" User data updated succesfully",
                            data:user
                        })
                    )
                   
                }
                return (
                    res.status(400).json({
                        status:'ERROR',
                        message: 'User not Found',
                        error: err
                    })
                )
    
            })
            .catch(err => {
                res.status(400).json({
                    status:'ERROR',
                    message: 'User update failed',
                    error: err
                })
            })


            
        } catch (error) {
            if(error.isJoi){
                res.status(400).json({
                    status: 'ERROR',
                    message: 'User Update Failed',
                    error:error.message
                })
            }
            res.status(400).json({
                status: 'ERROR',
                message: 'User Update Failed',
                error:error
            })
        }
    },

    deleteUser(req, res){
        UserModel.deleteOne({_id:req.params.id})
        .then((user)=>{
            res.status(200).json({
                status: 'OK',
                message:" User deleted succesfully",              
            })
        })
        .catch(err => {
            res.status(400).json({
                status:'ERROR',
                message: 'User delete failed',
                error: err
            })
        })
    }

}

module.exports = UserController;
