var QuizModel = require('../models/quizModel');
var QuizHistoryModel = require('../models/quizHistoryModel');


class QuizController {
    getQuizData() {
        /*
            Purpose - to get All the questions from the quiz collection
        */
        return new Promise((resolve, reject) => {
            QuizModel.findAll({}).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            })
        });
    }
    createFakeEntries() {
        /*
            Create dummy entries
        */
        var queryObj = {
            question_text: "Who is the best cricketer in the world?",
            options: [
                {
                    option_text : "Sachin Tendulkar",
                    option_type: "radio",
                    is_correct: true
                },
                {
                    option_text : "Virat Kolli",
                    option_type: "radio",
                    is_correct: false
                },
                {
                    option_text : "Adam Gilchirst",
                    option_type: "radio",
                    is_correct: false
                },
                {
                    option_text : "Jacques Kallis",
                    option_type: "radio",
                    is_correct: false
                },
            ]
        }
        QuizModel.create(queryObj).then((data) => {
            console.log('data row added successfully')

        });
        
        var queryObj = {
            question_text: "What are the colors in the Indian national flag? Select all:",
            options: [
                {
                    option_text : "White",
                    option_type: "checkbox",
                    is_correct: true
                },
                {
                    option_text : "Yellow",
                    option_type: "checkbox",
                    is_correct: false
                },
                {
                    option_text : "Orange",
                    option_type: "checkbox",
                    is_correct: true
                },
                {
                    option_text : "Green",
                    option_type: "checkbox",
                    is_correct: true
                },
            ]
        }
        QuizModel.create(queryObj).then((data) => {
            console.log('data row added successfully')

        });
        return;
    }
    isUserNameValid(userName) {
        /*
            Validate the value of the input field
        */
        if (userName == undefined)
            return false
        else
            return true
    }

    saveQuizResponse(content) {
        /*
            Save the response data to the database
        */
        return new Promise((resolve, reject) => {
            QuizHistoryModel.create(content).then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            })
        });
    }
    getAllRecordsWithQuestion() {
        /*
            get all the records from the database
        */
        return new Promise((resolve, reject) => {
            QuizHistoryModel.getAllRecordsWithQuestion().then((rowData) => {
                if (!rowData) {
                    console.log(`no data avaliable in `);
                    reject([]);
                }
                resolve(rowData);
            })
        });
    }
}

module.exports = new QuizController;