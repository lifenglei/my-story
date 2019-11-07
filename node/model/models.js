
var Const = require('../connect/connect')
var pool = Const.pool //数据库连接池
var Model = function () {

    this.LoginResult = null;//登录结果
    this.Headimg = null;
    this.idnum = 0;//文章id
    this.QQ=0;
    this.TEL=0
    var _this = this;
    //获取诗歌列表
    this.getStoryList = function (type, author, callback) {
        pool.getConnection(function (err, connection) {
            if (type == 1) {
                var query = "select id,title,content,time,author from article"
                connection.query(query, function (err, rows) {
                    if (err) throw err;
                    connection.release();
                    if (typeof (callback) == 'function') {
                        callback(rows);
                    }
                })
						}
						//获取所有
            if(type==2){
                var query = "select * from article where author=?"
                connection.query(query,author, function (err, rows) {
                    if (err) throw err;
                    connection.release();
                    if (typeof (callback) == 'function') {
                        callback(rows);
                    }
                })
            }
        })
    }

    //获取诗歌详情
    this.getDetai = function (response, callback) {
        pool.getConnection(function (err, connection) {
            var query = "SELECT * FROM article WHERE id=? and author=?"
            var mydata=[response.id,response.author]
            connection.query(query,mydata, function (err, rows) {
                if (err) throw err;
                connection.release();
                if (typeof (callback) == 'function') {
                    callback(rows);
                }
            })

        })
    }

    //获取个人能信息
    this.getinfo = function (type, callback) {
        pool.getConnection(function (err, connection) {

            if (type == 1) {
                var query = "select name,introduction,sex,age,Intentionalpost from message"
            }
            connection.query(query, function (err, rows) {
                if (err) throw err;
                connection.release();
                if (typeof (callback) == 'function') {
                    callback(rows);
                }
            })

        })
    }

    //登录操作
    this.Login = function (name, password, callback) {
        try{
            pool.getConnection(function (err, conn) {  
                if(err){
                    console.warn('从连接池中获取连接失败')
                }else{
                    //发送sql语句
                    var query = "SELECT * FROM user WHERE username=?"
                    conn.query(query, name, function (err, res) {
                        if (err) throw err;
                        conn.release();
                        if (res == null || res == '') {
                            _this.LoginResult = 0
                        } else if (res[0].password != password) {
                            _this.LoginResult = 2
                        } else if (res[0].password == password) {
                            _this.LoginResult = 1
                            _this.qq = res[0].qq
                        }
                        if (typeof (callback) == 'function') {
                            callback(_this.LoginResult, _this.qq);
                        }
                    })
                }
            })
        }catch(err){
            console.log(err)
        }
    }
    //发表文章操作
    this.publishArticle = function (response, callback) {
        pool.getConnection(function (err, connection) {
            _this.idnum = parseInt(Math.random(1000) * 1000 + 1);//文章id随机
            var query = "INSERT INTO article(id,title,author,content,time) VALUES(?,?,?,?,?)"
            var insert = [_this.idnum, response.title, response.author, response.content, response.time]
            connection.query(query, insert, function (err, result) {
                if (err) throw err;
                connection.release();
                if (typeof (callback) == 'function') {
                    callback(result);
                }
            })
        })
    }
}
module.exports = new Model()