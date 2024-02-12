import express from "express";
import artistRouter from "./routers/artist";
import mongoose from "mongoose";
import config from "./config";
import albumRouter from "./routers/album";
import trackRouter from "./routers/track";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());

app.use('/artist', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
};

void run();