import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Typography, Grid, Box, Tabs, Tab } from "@mui/material";
import axios from "axios";
import loadingImg from "../../assets/loading.gif";
import "./Dashboard.css";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import Tracks from "./Tracks";
import RecentArtists from "./RecentArtists";
import TabPanel from "./TabPanel";

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

  const recentlyPlayedTracks = recentlyPlayed.items.map((item) => item.track);

  return (
    <Grid
      container
      sx={{ height: "100vh", width: "100vw" }}
      alignItems="center"
      justifyContent="center"
      xs={8}
    >
      <Typography sx={{ color: "white", width: "100%" }} variant="h1">
        Hello, {userInfo.display_name}{" "}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Top Artists" />
          <Tab label="Top Songs" />
          <Tab label="Listening Stats" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TopArtists topArtistInfo={topArtistInfo} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tracks tracks={topTracksInfo.items} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tracks tracks={recentlyPlayedTracks} />
      </TabPanel>
    </Grid>
  );
}

export default Dashboard;
