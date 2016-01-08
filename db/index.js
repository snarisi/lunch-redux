import mongoose from 'mongoose';
import groupSchema from './group.model';

mongoose.connect('mongodb://localhost/lunch-redux');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

export const Group = mongoose.model('Group', groupSchema);
