var baseModel = require('./baseModel');
var quizSchema = require('../schemas/quiz_schema');

class quizModel extends baseModel {
    constructor() {
        super(quizSchema);
    }

}


module.exports = new quizModel();