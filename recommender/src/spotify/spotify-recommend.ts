import { SpotifyConfig } from '../configs/config';
import SpotifyWebApi from 'spotify-web-api-node';
// @ts-ignore
import SpotifyWebApiServer from 'spotify-web-api-node/src/server-methods';

(SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void })._addMethods(SpotifyWebApiServer);
export class SpotifyRecommender {
    spotifyApi: SpotifyWebApi;
    static instance: SpotifyRecommender;
  
    private constructor() {
        const spotifyApi = new SpotifyWebApi({
            ...SpotifyConfig,
          });

        spotifyApi.clientCredentialsGrant().then(
            (data) => {
              console.log('The access token expires in ' + data.body['expires_in']);
              console.log('The access token is ' + data.body['access_token']);
          
              // Save the access token so that it's used in future calls
              this.spotifyApi.setAccessToken(data.body['access_token']);
            },
            (err) => {
              console.log('Something went wrong when retrieving an access token', err);
            }
          );
          this.spotifyApi = spotifyApi;
    }

    static getInstance() {
        if (!SpotifyRecommender.instance) {
            SpotifyRecommender.instance = new SpotifyRecommender();
        }
        return SpotifyRecommender.instance;
    }

    getPlaylists = async (activity: string): Promise<any> => {
        const playlists = await this.spotifyApi.searchPlaylists(activity);
        return playlists;
    }

}
