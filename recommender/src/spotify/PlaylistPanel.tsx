import { IconButton, ImageList, ImageListItem, ImageListItemBar, makeStyles } from "@material-ui/core";

export interface Playlist {
    id: string;
    name: string;
    description: string;
    images: any[];
    tracks: any[];
    owner: any;
    uri: string;
    href: string;
    external_urls: {
        spotify: string;
    }
}


const useStyles = makeStyles((theme: any) => ({
    item: {
        cursor: "pointer",
        height: 150,
        width: 150,
        margin: theme.spacing(1)
    },
    img: {
        objectFit: "cover"
    },
    imageList: {
        height: "100%",
        width: "100%",
        justifyContent: "center"
    }
  }));

export const PlaylistItem = (props: {key: string, playlist: Playlist}) => {
    const classes = useStyles();
    const {key, playlist} = props;
    return (
        <ImageListItem cols={1} key={key} className={classes.item} onClick={() => window.open(playlist.external_urls.spotify)} >
            <img src={playlist.images[0].url} alt={playlist.name} className={classes.img}/>
            <ImageListItemBar
              title={playlist.name}
              subtitle={<span>{playlist.description}</span>}
             />
        </ImageListItem>
    );
}

export const PlaylistPanel = (props: {playlists: Playlist[], onPlaylistClick: (id: number) => void}) => {
    const classes = useStyles();
    const playlists = props.playlists.map(playlist => (
        <PlaylistItem
            key={playlist.id}
            playlist={playlist}/>
    ));         

    return (
        <ImageList className={classes.imageList} cols={2}>
            {playlists}
        </ImageList>
    )
}