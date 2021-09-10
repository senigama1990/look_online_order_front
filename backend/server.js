const express = require('express')
const host = 'localhost'
const PORT = 4500
const app = express()



app.listen(PORT, ()=>console.log(`Server is running on http://${host}:${PORT}`))