import { Box, Button, Fab, makeStyles, Typography } from "@material-ui/core"
import { useState } from "react";
import { PlaylistPanel, Playlist } from "./PlaylistPanel"
import { SpotifyRecommender } from "./spotify-recommend";

const useStyles = makeStyles(theme => ({
    box: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing(1),
        alignItems: "center",
    },
    button: {
    }
}));

interface Props {
    activity: string;
}

export const EmptyPanel = () => {

    return <div>Perform Activity and Search!</div>
}

export const SpotifyPanel = (props: Props) => {
    const classes = useStyles();
    const onClick = (id: number) => console.log(id)
    const recommender = SpotifyRecommender.getInstance();

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const searchPlaylists = ()  => {
        recommender.getPlaylists(props.activity).then(data => {
            const playlists = data.body.playlists.items;
            console.log(playlists);
            setPlaylists(playlists);
        });
    }

    return (<Box className={classes.box}>
         <Button variant="contained" className={classes.button} color="primary" aria-label="search" onClick={() => searchPlaylists()}>
             Search Playlists
        </Button>
        {playlists.length === 0 ? <EmptyPanel /> : <PlaylistPanel playlists={playlists} onPlaylistClick={onClick}/>}
    </Box>
    )
}