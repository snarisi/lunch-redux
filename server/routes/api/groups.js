import express from 'express';
import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { Group } from '../../../db';
import { yelp, formatResults, yelpCache } from '../../utils/yelp';
import { io } from '../../app.js';
// const io = require('../../app');

const router = express.Router();

router.param('id', function (req, res, next, id) {
    Group.findById(id)
        .then(group => {
            if (!group) {
                const err = new Error('Not found');
                err.status = 404;
                return next(err);
            }
            req.group = group;
            next();
        })
        .then(null, next);
});

router.get('/', function (req, res, next) {
    res.send('Groups');
});

router.get('/:id', function (req, res, next) {
    if (yelpCache[req.group._id]) {
        res.send(req.group.format(yelpCache[req.group._id], req.sessionID));
    } else {
        yelp.search({
            term: 'food',
            ll: req.group.location.join(',')
        })
        .then(results => {
            yelpCache[req.group._id] = formatResults(results);
            console.log(req.group.format(results), req.sessionID);
            res.send(req.group.format(formatResults(results), req.sessionID));
        });
    }
});

router.post('/', function (req, res, next) {
    console.log(req.sessionID);
    const newGroup = req.body;
    newGroup.admin = req.sessionID;
    Group.create(newGroup)
        .then(group => {
            res.send(group.format(null, req.sessionID));
        })
        .then(null, next);
});

router.put('/:id', function (req, res, next) {
    console.log(req.body);

    if (req.body.exclusions) {
        Group.findById(req.params.id)
            .then(group => {
                console.log('before: ', group);
                Object.keys(req.body.exclusions).forEach(key => {
                    group.set('exclusions.' + key, req.body.exclusions[key]);
                });
                return group.save();
            })
            .then(group => {
                // console.log(io.to);
                io.to(group._id).emit('update', { exclusions: group.exclusions });
                res.json(group.exclusions);
            })
            .then(null, next);
    } else if (req.body.closed) {
        req.group.closed = req.body.closed;
        req.group.save()
            .then(group => {
                res.send({ closed: group.closed });
            })
    }
})

export default router;
