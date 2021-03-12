const express = require('express')

require('./db/mongoose.js')

const noteRouter = require('./routers/note-routers.js')
const userRouter = require('./routers/user-routers')


const app = express()


app.use(express.json())

app.use(noteRouter)
app.use(userRouter)



const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})