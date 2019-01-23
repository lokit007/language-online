const urlData = 'mongodb://heroku_vzf3cmnx:drnupvegjbis3092mncric4g76@ds153814.mlab.com:53814/heroku_vzf3cmnx';

const optionData = {
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
};

var mongoose = require('mongoose');
var Cau = require('./models/cau.js');
var Hoc = require('./models/hoc.js');

var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var port = process.env.PORT || 3000;
// var baseUrl = 'http://localhost';
var baseUrl = 'https://langueges-online.herokuapp.com/';
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules/bootstrap'))

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(port, () => {
    if(port == 3000) baseUrl += ':' + port;
    console.log('Server run ' + baseUrl);
});

app.get('/', (req, res) => {
    mongoose.connect(urlData, optionData, err => {
        if(err) {
            console.log(err);
            res.render('home.html', {
                status: 'False',
                mes: 'Kết nối dữ liệu thất bại!',
                data: {},
                baseUrl: baseUrl
            });
        } else {
            Hoc.find({}).populate('lg1').populate('lg2').exec((err1, data) => {
                if(err1) {
                    mongoose.connection.close();
                    res.render('home.html', {
                        status: 'False',
                        mes: 'Kết nối dữ liệu thất bại!',
                        data: {},
                        baseUrl: baseUrl
                    });
                } else {
                    mongoose.connection.close();
                    res.render('home.html', {
                        status: 'True',
                        mes: 'Kết nối dữ liệu thành công!',
                        data: data,
                        baseUrl: baseUrl
                    });
                }
            });
        }
    });
});

app.post('/them-cau', (req, res) => {
    console.log(req.body);
    mongoose.connect(urlData, optionData, err => {
        if(err) res.status(400).json({
            status: 'False',
            mes: 'Thêm thất bại!'
        });
        else {
            var cau1 = new Cau({
                cau: req.body.cau1,
                ngonngu: req.body.lgCau1
            });
            cau1.save((err1, rs1) => {
                if(err1) {
                    mongoose.connection.close();
                    res.status(400).json({
                        status: 'False',
                        mes: 'Thêm thất bại!'
                    });
                } else {
                    var cau2 = new Cau({
                        cau: req.body.cau2,
                        ngonngu: req.body.lgCau2
                    });
                    cau2.save((err2, rs2) => {
                        if(err2) {
                            mongoose.connection.close();
                            res.status(400).json({
                                status: 'False',
                                mes: 'Thêm thất bại!'
                            });
                        } else {
                            var objNew = Hoc({
                                lg1: rs1,
                                lg2: [rs2]
                            });
                            objNew.save((err3, rs3) => {
                                if(err3) {
                                    mongoose.connection.close();
                                    res.status(400).json({
                                        status: 'False',
                                        mes: 'Thêm thất bại!'
                                    });
                                } else {
                                    mongoose.connection.close();
                                    res.status(200).json({
                                        status: 'True',
                                        mes: 'Thêm thành công!',
                                        data: rs3
                                    });                                    
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/update-cau', (req, res) => {
    console.log(req.body);
    mongoose.connect(urlData, optionData, err => {
        if(err) res.status(400).json({
            status: 'False',
            mes: 'Cập nhật thất bại!'
        });
        else {
            Hoc.updateOne({_id: req.body.cau}, {dung: req.body.dung, sai: req.body.sai}, (err, raw) => {
                if(err) {
                    mongoose.connection.close();
                    res.status(400).json({
                        status: 'False',
                        mes: 'Cập nhật thất bại!'
                    });
                } else {
                    mongoose.connection.close();
                    res.status(200).json({
                        status: 'True',
                        mes: 'Cập nhật thành công!'
                    });
                }
            });
        }
    });
});
