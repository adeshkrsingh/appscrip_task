var baseModel = require('./baseModel');
var quizHistorySchema = require('../schemas/quiz_history_schema');
var quizSchema = require('../schemas/quiz_schema');


/*
    Quiz Response History Data Provider
*/

class quizHistoryModel extends baseModel {
    constructor() {
        super(quizHistorySchema);
    }


    getAllRecordsWithQuestion() {
        /*
            1- Implementing additional function, apart from baseModel
            2- Used for getting response and question_text
        */
        let lookupObj = {
            from: 'quizzes',
            localField: 'answers.question_id',
            foreignField: '_id',
            as: 'answers.que_text'
        }
        return new Promise((resolve, reject) => {
            this.schemaUsed
              .aggregate([
                { $unwind: '$answers' },
                { $lookup: lookupObj },
                { $group : { 
                    _id : {
                    "token":"$_id",
                    "user_name":"$user_name",
                    "updated_at":"$updated_at",
                }, 
                    answers: { $push: "$answers" },
                    que_text: { $push: "$que_text" },
                } },
                
                { $project : {
                    user_name : 1 ,
                    'answers.response' : 1,
                    'answers.que_text.question_text' : 1,
                    'answers.que_text.options.option_text' : 1,
                    updated_at: 1,
                } },
                { $sort : { '_id.token' : -1} }
              ])
              .exec(function(err, rowData) {
                if (err) {
                    reject([]);
                }
                if (!rowData) {
                    reject([]);
                }
                resolve(rowData);
              });
          });
    }

}


module.exports = new quizHistoryModel();