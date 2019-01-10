var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var HocModelSchema = new Schema({
    id: Number,
    lg1: { type: Schema.ObjectId, ref: 'Cau' },
    lg2: [
        { type: Schema.ObjectId, ref: 'Cau' }
    ],
    dung: { type: Number, default: 0 },
    sai:  { type: Number, default: 0 },
    hoctiep: { type: Date, default: Date.now }
});

//Xuất ra lớp mô hình "SomeModel"
module.exports = mongoose.model('Hoc', HocModelSchema );