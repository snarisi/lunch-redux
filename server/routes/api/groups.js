import express from 'express';
import { Group } from '../../../db';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Groups');
});

router.get('/:id', function (req, res, next) {
    Group.findById(req.params.id)
        .then(group => {
            res.send(group.format());
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
