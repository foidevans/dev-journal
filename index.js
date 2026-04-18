import http from 'http';
import { handleRoutes } from './routes.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    handleRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`Dev Journal is running on port ${PORT}`);
});

