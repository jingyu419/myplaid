var express = require('express');
var router = express.Router();
var request = require('request');
var data = null;

/* GET home page. */
router.get('/', function(req, res, next) {    
  res.render('index', { title: data });
    });  

router.post('/', function(req, res, next) {


  var url = 'https://development.plaid.com/auth/get';
  
  
  var ReqData = {
      secret: req.body.secret,
      access_token: req.body.token,
      client_id: req.body.clientid       
  };
 console.log("printing body");
 console.log(req.body);

  var options = {
    method: 'post',
    body: ReqData,
    json: true,
    url: url
};

request(options, function (err, resp, body) {
    if (err) {
        console.log('error posting json: ', err);
        throw err
    }

    console.log("value of response: ", JSON.stringify(resp));
    data = JSON.stringify(resp, null,4);
    res.render('index', { title: data });
})

});  
 


module.exports = router;
