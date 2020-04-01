/*
 * @Description: This is a javasrcipt file
 * @Author: JeanneWu
 * @Date: 2019-12-14 11:18:59
 */
var express = require("express");
var app = express();
   

let Web3 = require('web3');
let cors = require('cors')
let web3;

const password = "ftec5510";
const sendData = require('./sendData')
const bodyParser = require('body-parser');

const tool = require('./common/tool');
const {
    success,
    fail
} = tool;

app.use(bodyParser.json()); //中间键解析，否则收不到body的值
app.use(cors())

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With,token');
    // res.header('Access-Control-Allow-Credentials','true');
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
};
app.get('/getAccount', (req, res) => {


    sendData.getAccount('', (error, data) => {
        if (error) {
            res.send(fail(error));
        } else {
            res.send(success(data))
        }
    })

})

app.post('/send', (req, res) => {

    let {
        message,
        sender,
        receiver
    } = req.body;

    let params = {
        message,
        sender,
        receiver
    };
    console.log(req.body);
    sendData.sendDataFun(params, (error, data) => {
        if (error) {
            res.send(fail(error));
        } else {
            res.send(success(data))
        }
    })

})

app.post('/getData', (req, res) => {

    let {
        hash
    } = req.body;

    let params = {
        hash
    };
    console.log(req.body);
    sendData.getData(params, (error, data) => {
        if (error) {
            res.send(fail(error));
        } else {
            res.send(success(data))
        }
    })

})
app.listen(3000);