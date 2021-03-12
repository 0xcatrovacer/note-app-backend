const mongoose = require('mongoose')

const dbconnecturl = process.env.dbURL;

mongoose.connect(dbconnecturl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})