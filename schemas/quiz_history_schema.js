//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;;

const questionResponseSchema = new Schema({
    question_id:  { type: ObjectId },
    response: [],
});

var quizHistorySchema = new Schema({
    user_name:  { type: String, default: null },
    answers: [questionResponseSchema],
    deleted_at: { type: String, default: null },
    updated_at: { type: Date, default: Date.now }
});





// Compile model from schema
module.exports = mongoose.model('quiz_history', quizHistorySchema);