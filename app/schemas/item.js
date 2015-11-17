var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var ItemSchema = new Schema({
    name: String,
    age: Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }

});

ItemSchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
});

ItemSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb){
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = ItemSchema;