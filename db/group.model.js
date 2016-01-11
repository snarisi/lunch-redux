import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    location: [Number],
    exclusions: { type: Schema.Types.Mixed },
    closed: { type: Boolean, default: false }
});

schema.methods.format = function (yelpResults) {
    return {
        group: {
            _id: this._id,
            name: this.name,
            location: this.location
        },
        exclusions: this.exclusions,
        options: {
            all: yelpResults,
            remaining: [],
            top: null
        },
        closed: this.closed
    }
}

export default schema;
