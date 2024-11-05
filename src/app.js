import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));

const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.get(`/:roomId`, (req, res) => {
    res.sendFile(join(__dirname, 'socket.html'));
})

server.listen(5173, () => {
    console.log('server running at http://localhost:5173');
});