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
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expirationTimeMath = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expirationTimeMath) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expirationTimeMath[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            window.location = this.getURL();
        }
    },
    async search(term) {
        const token = this.getAccessToken();
        console.log(token);
        try{
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
              });
            if(response.ok) {
                const jsonResponse = await response.json();
                if(!jsonResponse.tracks.items) {
                    return [];
                }else{
                    return jsonResponse.tracks.items.map(track => ({
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        })
                    );
                }
            }

            throw new Error("Request failded");
        }
        catch(error) {
            console.log(error);
        }
    }
}

export default Spotify;



