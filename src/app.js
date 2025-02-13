import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:8080/rooms",
    credentials: true,
}));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, 'src')));

const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get(`/rooms/:roomId`, (req, res) => {
    res.sendFile(join(__dirname, 'socket.html'));
})

server.listen(5173, () => {
    console.log('server running at http://localhost:5173');
});
