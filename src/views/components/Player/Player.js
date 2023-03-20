import "./Player.css";

import { useContext, useState, useRef, useEffect } from "react";
import { AccessTokenContext } from "../App/App";

import { ReactComponent as Shuffle } from "../../assets/shuffle.svg";
import { ReactComponent as Prev } from "../../assets/prev.svg";
import { ReactComponent as Pause } from "../../assets/pause.svg";
import { ReactComponent as Repeat } from "../../assets/repeat.svg";

const Player = ({}) => {
  const { accessToken } = useContext(AccessTokenContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off");
  const [trackUri, setTrackUri] = useState();
  const [songInfo, setSongInfo] = useState({});

  useEffect(() => {
    if (!deviceInfo.id || !trackUri) return;
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ uris: [trackUri] }),
      }
    );
  }, [deviceInfo.id, trackUri, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(() => {
      fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((playback) => {
          if (!playback || !playback.item) return;
          setCurrentTime(playback.progress_ms / 1000);
          setDuration(playback.item.duration_ms / 1000);
          setDeviceInfo(playback.device);
          setShuffle(playback.shuffle_state);
          setRepeat(playback.repeat_state);
          setTrackUri(playback.trackUri);
          setSongInfo({
            title: playback.item.name,
            url: playback.item.album.images.find((img) => img.height == 640)
              .url,
            artist: playback.item.artists
              .map((artist) => artist.name)
              .join(", "),
            next: "three wheels and it still drives",
          });
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [accessToken]);

  const onSliderChange = (e) => {
    const newTime = e.target.value * 1000;
    fetch(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${newTime}&device_id=${deviceInfo.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setCurrentTime(newTime / 1000);
  };

  const togglePlay = async () => {
    const method = isPlaying ? "PUT" : "PUT";
    const endpoint = isPlaying ? "pause" : "play";
    await fetch(
      `https://api.spotify.com/v1/me/player/${endpoint}?device_id=${deviceInfo.id}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setIsPlaying(!isPlaying);
  };

  const toggleShuffle = async () => {
    const newShuffleState = !shuffle;
    await fetch(
      `https://api.spotify.com/v1/me/player/shuffle?state=${newShuffleState}&device_id=${deviceInfo.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setShuffle(newShuffleState);
  };

  const toggleRepeat = async () => {
    const newRepeatState =
      repeat === "off" ? "context" : repeat === "context" ? "track" : "off";
    await fetch(
      `https://api.spotify.com/v1/me/player/repeat?state=${newRepeatState}&device_id=${deviceInfo.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setRepeat(newRepeatState);
  };

  const skipToPrevious = async () => {
    await fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const skipToNext = async () => {
    await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="NowPlaying">
      <h1>Now Playing</h1>
      <div className="Player">
        <p className="next">
          <span className="neutral">next - </span>
          <span className="primary">{songInfo.next}</span>
        </p>
        <div className="song">
          <img src={songInfo.url} alt="album cover" />
          <p className="title">{songInfo.title}</p>
          <p className="artist">{songInfo.artist}</p>
        </div>
        <div className="footer">
          <div className="scroll-bar">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={onSliderChange}
              className="slider"
            />
            <div className="timestamps">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <div className="controls">
            <Shuffle onClick={toggleShuffle} alt="shuffle" id="shuffle" />
            <div className="center">
              <Prev onClick={skipToPrevious} alt="previous" id="previous" />
              <Pause onClick={togglePlay} alt="pause" id="pause" />
              <Prev
                onClick={skipToNext}
                className="control-img"
                alt="skip"
                id="skip"
              />
            </div>
            <Repeat onClick={toggleRepeat} alt="repeat" id="repeat" />
            {/* {repeat === "off"
              ? "Enable Repeat"
              : repeat === "context"
              ? "Repeat Context"
              : "Repeat Track"} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
