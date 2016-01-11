import express from 'express';
import Promise from 'bluebird';
import { Group } from '../../../db';
import { yelp, formatResults, yelpCache } from '../../utils/yelp';

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
        console.log(req.group);
        res.send(req.group.format(yelpCache[req.group._id]));
    } else {
        yelp.search({
            term: 'food',
            ll: req.group.location.join(',')
        })
        .then(results => {
            yelpCache[req.group._id] = formatResults(results);
            console.log(req.group.format(results));
            res.send(req.group.format(formatResults(results)));
        });
    }
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    Group.create(req.body)
        .then(group => {
            res.send(group.format());
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
                return Group.findById(req.params.id)
            })
            .then(group => {
                console.log('after: ', group);
                res.send(group.exclusions);
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
