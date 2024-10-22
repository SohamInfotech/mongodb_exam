var mongoose = require('mongoose')

const schema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    gender: String,
    hobby: Array,
    city: String
})

module.exports = mongoose.model('soham', schema)