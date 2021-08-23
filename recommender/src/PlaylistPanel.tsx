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
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    item: {
        height: "200px",
        width: "20%",
        cursor: "pointer",
    }
  }));

export const PlaylistItem = (props: {key: string, playlist: Playlist}) => {
    const classes = useStyles();
    const {key, playlist} = props;
    return (
        <ImageListItem key={key} className={classes.item} onClick={() => window.open(playlist.external_urls.spotify)} >
            <img src={playlist.images[0].url} alt={playlist.name}/>
            <ImageListItemBar
              title={playlist.name}
              subtitle={<span>{playlist.description}</span>}
              actionIcon={
                <IconButton aria-label={`Play ${playlist.name}`} >
                </IconButton>
              } />
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
        <div className={classes.root}>
            <ImageList>
                {playlists}
            </ImageList>
        </div>
    )
}