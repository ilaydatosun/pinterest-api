const express = require('express')
const app = express()
require('./db/dbConnection')
const errorMiddleware= require('./middleware/errorMiddleware')

const postRouter = require('./router/postRouter')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/api', postRouter)
app.use('/api/posts', postRouter)

app.get('/', (req, res) => {
    res.json({ 'message': 'anasayfa' })
})

app.listen(3001, () => {
    console.log("3001 portu");
})
app.use(errorMiddleware)