export interface ArtistMutation {
    name: string,
    image: string | null,
    info: string,
}

export interface AlbumMutation {
    name: string,
    artist: string,
    date: string,
    image: string | null,
}