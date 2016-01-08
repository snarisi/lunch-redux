import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import api from './routes/api';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', api);

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use(function (err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status).send(err.message);
})

app.listen(port, () => {
    console.log('Server listening on port ', port);
});
