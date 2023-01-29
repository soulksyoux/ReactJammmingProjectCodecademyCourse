import { client_id } from "./myVars";
import { redirect_uri } from "./myVars";
let accessToken = "";
const clientId = client_id;
const redirectUri = redirect_uri;

const Spotify = {
    getURL() {
        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientId);
        url += '&redirect_uri=' + encodeURIComponent(redirectUri);
        return url;
    },
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const token = window.location.href.match(/access_token=([^&]*)/)[1];
        const expiration_time = window.location.href.match(/expires_in=([^&]*)/)[1];
        console.log(token);
        console.log(expiration_time);
    }
}

export default Spotify;



