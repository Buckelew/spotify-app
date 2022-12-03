import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TopArtists from "../TopArtists/TopArtists";
import Header from "../Header/Header";
import Player from "../Player/Player";
import TopTracks from "../TopTracks/TopTracks";
import axios from "axios";
import loadingImg from "../../assets/loading.gif";
import spotifyLogo from "../../assets/Spotify_Logo_CMYK_White.png";
import "./Dashboard.css";

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [topArtistInfo, setTopArtistInfo] = useState();
  const [topTracksInfo, setTopTracksInfo] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [value, setValue] = useState(0);
  const { accessToken } = props;
  const stateKey = "spotify_auth_state";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // make sure this only runs once
  useEffect(() => {
    const callSpotifyAPI = async () => {
      const [userRes, topArtistsRes, topTracksRes, recentlyPlayed] =
        await Promise.all([
          axios({
            url: "https://api.spotify.com/v1/me",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }),
          axios({
            url: "https://api.spotify.com/v1/me/top/artists",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }),
          axios({
            url: "https://api.spotify.com/v1/me/top/tracks",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }),
          axios({
            url: "https://api.spotify.com/v1/me/player/recently-played?limit=50",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }),
        ]);
      localStorage.removeItem(stateKey);
      setLoading(false);
      setUserInfo(userRes.data);
      setTopArtistInfo(topArtistsRes.data);
      setTopTracksInfo(topTracksRes.data);
      setRecentlyPlayed(recentlyPlayed.data);
    };

    callSpotifyAPI();
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (loading)
    return (
      <div className="Dashboard loading">
        <img src={loadingImg} alt="loading" />
      </div>
    );

  return (
    <main className="Dashboard">
      <img src={spotifyLogo} alt="Spotify Logo" style={{height: '2em', marginTop: '1em'}} />
      <Header userInfo={userInfo} />
      <TopArtists topArtistInfo={topArtistInfo} />
      <Player />
      <TopTracks topTracksInfo={topTracksInfo} />
    </main>
  );
}

export default Dashboard;
