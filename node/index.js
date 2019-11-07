
var express = require('express');
var app = express();
var routes=require('./route/route');
var bodyParser = require('body-parser');//解析请求
var cookieParser = require('cookie-parser'); //解析cookie

/********
 * //解析参数
 */
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




/********
 * 跨域
 * @type {http.Server}
 */
//allow custom header and CORS
app.all('*',function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



/********
 * 路由
 */
routes(app);



/********
 *静态文件托管
 */
app.use(express.static('static'));


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});