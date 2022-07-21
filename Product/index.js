const express = require('express')
const app = express()


PORT = process.env.PORT || 4001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})