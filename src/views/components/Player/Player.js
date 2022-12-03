import "./Player.css";

import shuffle from "../../assets/shuffle.svg";
import prev from "../../assets/prev.svg";
import pause from "../../assets/pause.svg";
import repeat from "../../assets/repeat.svg";

const song = {
  title: "Dark Side Of The Moon",
  url: "https://i.scdn.co/image/ab67616d00001e02d918e2dedfd03faa485a143e",
  artist: "suisside",
  next: "three wheels and it still drives",
  time_ms: 36000,
  duration_ms: 168000,
};

const Player = ({}) => {
  return (
    <div className="NowPlaying">
      <h1>Now Playing</h1>
      <div className="Player">
        <p className="next">next - {song.next}</p>
        <div className="song">
          <img src={song.url} alt="album cover" />
          <p className="title">{song.title}</p>
          <p className="artist">{song.artist}</p>
        </div>
        <div className="controls">
          <img src={shuffle} alt="shuffle" />
          <img src={prev} alt="previous" />
          <img src={pause} alt="pause" />
          <img src={prev} alt="skip" />
          <img src={repeat} alt="repeat" />
        </div>
      </div>
    </div>
  );
};

export default Player;
