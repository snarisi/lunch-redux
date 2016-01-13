import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    location: [Number],
    exclusions: { type: Schema.Types.Mixed },
    admin: { type: String },
    closed: { type: Boolean, default: false }
});

schema.methods.format = function (yelpResults, sessionID) {
    console.log(sessionID);
    console.log(this.admin);
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
        isAdmin: this.admin === sessionID,
        closed: this.closed
    }
}

export default schema;
