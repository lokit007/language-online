var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var CauModelSchema = new Schema({
    id: { type: Number, default: 0 },
    cau: { type: String, required: true },
    ngonngu: { type: String, required: true }
});

//Xuất ra lớp mô hình "SomeModel"
module.exports = mongoose.model('Cau', CauModelSchema );