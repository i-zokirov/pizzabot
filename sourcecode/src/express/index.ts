import express, { json, urlencoded } from "express";
import http from "http";
import "express-async-errors";
import { Server, Socket } from "socket.io";
import { notFoundErrorHandler, errorHandler } from "./middleware/errorHandlers";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./interfaces/socket";

// MIDDLEWARE
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// ERROR HANDLERS
app.use(notFoundErrorHandler);
app.use(errorHandler);

// HTTP SERVER
const server = http.createServer(app);

// SOCKET SERVER
export const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Listening on port", port));
