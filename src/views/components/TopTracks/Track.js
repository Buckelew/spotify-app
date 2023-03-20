import { shadows } from "../common/constants";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const Track = ({ track, i }) => {
  return (
    <li
      className="Track"
      onClick={() => window.open(track.uri)}
      style={{ filter: shadows.SMALL }}
    >
      <p className="num light">
        {(i + 1).toString().length == 1 ? "0" + (i + 1) : i + 1}
      </p>
      <img
        src={track.album.images.find((img) => img.height == 64).url}
        alt="album cover"
      />
      <p className="trackName strong">{track.name}</p>
      <p className="artist light">
        {track.artists.map((artist) => artist.name).join(", ")}
      </p>
      <p className="length light">
        {millisToMinutesAndSeconds(track.duration_ms)}
      </p>
    </li>
  );
};

export default Track;
