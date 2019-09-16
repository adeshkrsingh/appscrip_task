/*
    Act as a base function holder for all other models
*/

class baseModel {
    constructor(childSchema) {
        this.schemaUsed = childSchema;
    }
    validateParameters() {
        /* used to verify the parameters, if not avaliable than set default */
        if (this.schemaUsed == undefined) {
            return false;
        } else {
        }
        if (this.skip == undefined) {
            this.skip = 0;
        }
        if (this.page == undefined) {
            this.page = 1;
        }
        if (this.limit == undefined) {
            this.limit = 30;
        }
        /* true if all undefined data sets to default */
        return true;
    }
    findAll(queryObj) {
        if (this.validateParameters() ) {
            var self = this;
            /* Promise start */
            return new Promise((resolve, reject) => {
                this.schemaUsed
                  .aggregate([
                    { $match: queryObj },
                    { "$limit": this.skip + this.limit },
                    { "$skip": this.skip }
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
            /* Promise ends */
        } else {
            return [];
        }
    }
    create(queryObj) {
        if (this.validateParameters() ) {
            var self = this;
            queryObj.done = true;
            /* Promise start */
            return new Promise((resolve, reject) => {
                this.schemaUsed
                .create(queryObj, function (err, rowData) {
                  if (err) {
                      reject([]);
                  }
                  if (!rowData) {
                      reject([]);
                  }
                  resolve(rowData);
                });
              });
            /* Promise ends */
        } else {
            return [];
        }
    }
}


module.exports = baseModel;