var express = require('express');
var router = express.Router();
var QuizController = require('./../controllers/quiz_controller');
var completePath = '/quiz';
const url = require('url');

/* 
  Quiz Main Page
*/
router.get('/', function (req, res, next) {
    res.render('quiz/start', {
      title: 'Welcome to AppScrip'
    });
});


/*
  Start Quiz Page
*/
router.post('/', function (req, res, next) {
  user_name = req.body.user_name;
  if (QuizController.isUserNameValid(user_name)) {
    QuizController.getQuizData().then((data) => {
      res.render('quiz/questions', {
        data: data,
        user_name: user_name
      });
    });

  } else {
    res.redirect(completePath);
  }
});


/*
  To save response to the mongo collection
*/
router.post('/submit', function (req, res, next) {
  var completeRespObj = [];
  var responseObj = [];
  var que = req.body.questions;
  var user_name = req.body.user_name;

  for (let index = 0; index < que.length; index++) {
    const element = que[index];
    let optionName = "option" + element;
    responseObj.push({
      question_id: element,
      response: req.body[optionName]
    })
  }

  completeRespObj.push({
    user_name : user_name,
    answers: responseObj
  })
  QuizController.saveQuizResponse(completeRespObj).then((data) => {
    res.redirect('/quiz/history')
  })
});


/*
  Create Sample entries
*/
router.get('/createEntries', function (req, res, next) {
  QuizController.createFakeEntries()
    res.send("done");
});


/*
  Get All the attempted history record from collection
*/
router.get('/history', function (req, res, next) {
  QuizController.getAllRecordsWithQuestion().then((data) => {
    res.render('quiz/history', {
      data: data,
    });
  });
});




module.exports = router;