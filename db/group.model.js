import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    location: [Number],
    exclusions: { type: Schema.Types.Mixed, default: {} },
    closed: { type: Boolean, default: false }
});

schema.methods.format = function () {
    return {
        group: {
            _id: this._id,
            name: this.name,
            location: this.location
        },
        exclusions: this.exclusions,
        options: {
            all: require('./dummyyelp.js'),
            remaining: [],
            top: null
        }
    }
}

export default schema;
