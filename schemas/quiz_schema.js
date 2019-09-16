//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;;

const optionsSchema = new Schema({
    option_id:  { type: ObjectId },
    option_text: { type: String, default: null },
    option_type: { type: String, default: 'radio' },
});

var quizHistorySchema = new Schema({
    question_text:  { type: String, default: null },
    options: [],
    deleted_at: { type: String, default: null },
    updated_at: { type: Date, default: Date.now }
});


// Compile model from schema
module.exports = mongoose.model('quiz', quizHistorySchema);