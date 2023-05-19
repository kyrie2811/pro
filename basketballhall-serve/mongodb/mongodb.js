const mongoose = require('mongoose')
const mongdbURI = "mongodb://localhost:27017/music-system"
mongoose.connect(mongdbURI).then(() => {
    console.log(`Mongdb has been connected .Plaese have a great coding`)
})