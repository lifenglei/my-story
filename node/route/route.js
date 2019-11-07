var models = require("../model/models");
/********
 * 定义路由  根据路由请求node接口
 * @param app
 */
module.exports = function(app) {
  //获取文章列表
  app.get("/artical", function(req, res) {
    var type = req.query.type;
    var name = req.query.name;
    if(name===''){
			res.json({
				errorCode:101
			})
    }else{
    models.getStoryList(type, name, function(rows) {
        res.json({
            list: rows
        });
      });
    }
  });

  //文章详情
  app.get("/detail", function(req, res) {
    var response = {
      id: req.query.id,
      author: req.query.author
    };
    models.getDetai(response, function(rows) {
      res.json({
        info: rows
      });
    });
  });
  //个人信息
  app.get("/info", function(req, res) {
    var type = req.query.type;
    models.getinfo(type, function(rows) {
      res.json({
        info: rows
      });
    });
  });
  //登录接口
  app.get("/login", function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    models.Login(username, password, function(result, QQ) {
      res.json({
        state: result,
        QQ: QQ
      });
    });
  });
  //发表文章接口
  app.get("/publish", function(req, res) {
    // 输出 JSON 格式
    var response = {
      title: req.query.title,
      author: req.query.author,
      content: req.query.content,
      time: req.query.time
    };
    models.publishArticle(response, function(result) {
      res.json({
        state: result
      });
    });
  });
};
