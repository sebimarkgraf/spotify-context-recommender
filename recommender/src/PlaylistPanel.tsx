
interface Playlist {
    id: number;
}


export const PlaylistItem = (props: {key: number, playlist: Playlist, onClick: (id: number) => void}) => {
    const {key, playlist} = props;
    return (
        <li key={key}>
            <div className="playlist-item">
                <div className="playlist-item-title">{playlist.id}</div>
                <div className="playlist-item-subtitle">{playlist.id}</div>
            </div>
        </li>
    );
}

export const PlaylistPanel = (props: {playlists: Playlist[], onPlaylistClick: (id: number) => void}) => {
    const playlists = props.playlists.map(playlist => (
        <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            onClick={props.onPlaylistClick} />
    ));         

    return (
        <ul>
        {playlists}
        </ul>
    )
}