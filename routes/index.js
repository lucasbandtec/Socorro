var express = require('express');
var router = express.Router();
var database = require('../Database.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json(database('SELECT * FROM TB_LEITURA_PC'))
  
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});
router.get('/historico', function(req, res, next){
  res.render('historico', { title: 'historico'});
});
router.get('/pagamento', function(req, res, next){
  res.render('pagamento', { title: 'pagamento'});
});
router.get('/usuario', function(req, res, next){
  res.render('usuario', { title: 'usuario'});
});
router.get('/login', function(req, res, next){
  res.render('login', { title: 'login'});
});


var count = 0;
router.get('/usocpu', function(req, res, next) {
  count = count +1;
  res.json({"usage": count})
 
});

var a = {"chave":1,"nome":"Lucas"}

module.exports = router;
