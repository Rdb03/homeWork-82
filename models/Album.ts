import {Schema, model, Types} from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const artist = await Artist.findById(value);
                return Boolean(artist);
            },
            message: 'Artist does not exist!',
        }
    },
    date: {
        type: String,
        required: true,
    },
    image: String,
});

const Album = model('Album', AlbumSchema);

export default Album;