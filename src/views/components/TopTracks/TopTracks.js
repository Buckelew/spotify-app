import "./TopTracks.css";
import Track from "./Track";

const TopTracks = ({ topTracksInfo }) => {
  console.log(topTracksInfo.items);
  return (
    <div className="TopTracks">
      <h1>Most Played</h1>
      <ul className="tracks">
        {topTracksInfo.items.map((track, i) => (
          <Track i={i} track={track} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
