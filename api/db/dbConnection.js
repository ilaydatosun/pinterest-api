const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/crudblog')
.then(() => console.log("veritabanına bağlandı"))
.catch(err => console.log("db bağlantı hatası"))