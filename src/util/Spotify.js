import { client_id } from "./myVars";
import { redirect_uri } from "./myVars";
let accessToken = "";
const clientId = client_id;
const redirectUri = redirect_uri;


const Spotify = {

    getURL() {
        let url = 'https://accounts.spotify.com/authorize';
        url += '?client_id=' + encodeURIComponent(clientId);
        url += '&response_type=token';
        url += '&scope=playlist-modify-public';
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
        const token = Spotify.getAccessToken();
        if(!term) {
            return [];
        } 
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
                if(!jsonResponse.tracks) {
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
    },
    async savePlaylist(playlistName, tracksUris) {

        if(!playlistName || !tracksUris) {
            return;
        }
        //An access token variable, set to the current user’s access token
        const token = this.getAccessToken();

        let userId;
        let playlistId;

        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                userId = jsonResponse.id;
            }

        }catch(error) {
            console.log(error);
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ name: playlistName }),
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                playlistId = jsonResponse.id;
            }

        }catch(error) {
            console.log(error);
        }

        try {
            await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ uris: tracksUris }),
            });

        }catch(error) {
            console.log(error);
        }
    },

    async getPlaylistsFromUser() {

        const token = this.getAccessToken();

        let userId;

        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                userId = jsonResponse.id;
            }

        }catch(error) {
            console.log(error);
        }

        try{
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
              });
            if(response.ok) {
                const jsonResponse = await response.json();
                if(!jsonResponse.items) {
                    return [];
                }else{
                    return jsonResponse.items.map(playlist => ({
                            id: playlist.id,
                            name: playlist.name,
                         })
                    );
                }
            }else{
                throw new Error("Request failded");
            }

        }
        catch(error) {
            console.log(error);
        }
    }
}

export default Spotify;



