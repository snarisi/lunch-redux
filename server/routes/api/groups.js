import express from 'express';
import { Group } from '../../../db';

const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Groups');
});

router.post('/', function (req, res, next) {
    Group.create(req.body)
        .then(group => {
            res.send(group.format());
        })
        .then(null, next);
});

export default router;
