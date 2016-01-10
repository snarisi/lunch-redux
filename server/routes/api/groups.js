import express from 'express';
import Promise from 'bluebird';
import { Group } from '../../../db';
import { yelp, formatResults, yelpCache } from '../../utils/yelp';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Groups');
});

router.get('/:id', function (req, res, next) {
    // const findGroup = Group.findById(req.params.id);
    // const searchYelp = yelp.search({
    //     term: 'food',
    //     ll: group.location
    //
    // });
    //
    // Promise.all([findGroup, searchYelp])
    //     .spread((group, results) => {
    //         res.send(group.format(formatResults(results)));
    //     });

    let group;

    Group.findById(req.params.id)
        .then(foundGroup => {
            group = foundGroup;
            if (yelpCache[group._id]) {
                return yelpCache[group._id];
            } else {
                return yelp.search({
                    term: 'food',
                    ll: group.location.join(',')
                });
            }
        })
        .then(results => {
            console.log(yelpCache);
            yelpCache[group._id] = results;
            res.send(group.format(formatResults(results)));
        })
        .then(null, next);
})

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
    }
})

export default router;
