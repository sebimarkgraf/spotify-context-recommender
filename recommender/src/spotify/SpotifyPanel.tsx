import { Box, Button, Typography } from "@material-ui/core"
import { useState } from "react";
import { PlaylistPanel, Playlist } from "./PlaylistPanel"
import { SpotifyRecommender } from "./spotify-recommend";


interface Props {
    activity: string;
}

export const EmptyPanel = () => {

    return <div>Perform Activity and Search!</div>
}

export const SpotifyPanel = (props: Props) => {
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

    return (<Box>
        <Button variant="contained" color="primary" onClick={() => searchPlaylists()}>Search Playlists</Button>
        {playlists.length === 0 ? <EmptyPanel /> : <PlaylistPanel playlists={playlists} onPlaylistClick={onClick}/>}
    </Box>
    )
}