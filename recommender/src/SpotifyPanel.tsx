import { Box, Button, Typography } from "@material-ui/core"
import { PlaylistPanel } from "./PlaylistPanel"


export const SpotifyPanel = (props: any) => {
    const playlists: any[] = [];
    const onClick = (id: number) => console.log(id)

    return (<Box padding="10px">
        <Typography variant="h3">Spotify</Typography>
        <Typography variant="subtitle1">Playlist Recommender</Typography>
        <Button variant="contained" color="primary">Search Playlists</Button>
        <PlaylistPanel playlists={playlists} onPlaylistClick={onClick}/>
    </Box>
    )
}