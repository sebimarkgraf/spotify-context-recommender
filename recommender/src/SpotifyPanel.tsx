import { Box, Typography } from "@material-ui/core"
import { PlaylistPanel } from "./PlaylistPanel"


export const SpotifyPanel = (props: any) => {
    return (<Box padding="10px">
        <Typography variant="h3">Spotify</Typography>
        <Typography variant="subtitle1">Playlist Recommender</Typography>
        <PlaylistPanel {...props} />
    </Box>
    )
}