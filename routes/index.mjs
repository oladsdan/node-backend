// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

// reWriting the functions

import { default as express } from "express";

export const router = express.Router();

router.get('/', async(req, res, next)=> {
  //..place for notes home page code
  res.render('index',{title: 'Notes'});
});


