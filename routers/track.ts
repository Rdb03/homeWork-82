import express from "express";
import {imagesUpload} from "../multer";
import {TrackMutation} from "../type";
import Track from "../models/Track";
import Album from "../models/Album";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
    try {
        const albumId = req.query.album as string;
        const artistId = req.query.artist as string;
        let tracks;

        if (artistId) {
            tracks = await Album.find({ artist: artistId });
        } else if (albumId) {
            tracks = await Track.find({ album: albumId });
        } else {
            tracks = await Track.find();
        }

        res.send(tracks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

trackRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    try {
        const albumData: TrackMutation = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new Track(albumData);
        await track.save();

        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default trackRouter;