import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import socketio from 'socket.io';
import api from './routes/api';
import session from 'express-session';

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Server listening on port ', port);
});

app.use(session({
    secret: 'lunch'
}));

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
    console.error(err);
    res.status(err.status).send(err.message);
});

io.on('connection', function (socket) {
    console.log('socket connected');
    socket.on('room', function (room) {
        socket.join(room);
    });
});

export { io };
