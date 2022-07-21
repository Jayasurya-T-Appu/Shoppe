const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD} = require('./config/config')
const UserRoutes = require('./routes/User.routes');
const AuthRouter = require('./routes/auth.routes')
const token = require('./helper/jwt_bcrypt.helper')
app.use(express.json());


const URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// Connect to MongoDB
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/health', (req, res) => {
    res.send('<h1>User Service Running !!</h1>');
})


app.use(`/api/v1/user`, UserRoutes);
app.use(`/api/v1/auth`, AuthRouter)


// Server
PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
}) 