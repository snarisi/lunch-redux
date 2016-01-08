import express from 'express';
import { Group } from '../../../db';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Groups');
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    Group.create(req.body)
        .then(group => {
            res.send(group.format());
        })
        .then(null, next);
});

router.put('/', function (req, res, next) {
    console.log(req.body);

    if (req.body.exclusions) {
        Group.findOne()
            .then(group => {
                console.log(group);
                Object.keys(req.body.exclusions).forEach(key => {
                    group.exclusions[key] = req.body.exclusions[key];
                });
                return group.save()
            })
            .then(group => {
                res.send(group.exclusions);
            })
            .then(null, next);
    }
})

export default router;
