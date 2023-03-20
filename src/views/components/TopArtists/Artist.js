import { shadows } from "../common/constants";

const Artist = ({ artist }) => {
  return (
    <li className="Artist" onClick={() => window.open(artist.uri)}>
      <img
        src={artist.images.find((img) => img.height == 320).url}
        alt={artist.name + " image"}
        style={{ filter: shadows.LARGE }}
      />
      <p>{artist.name}</p>
    </li>
  );
};

export default Artist;
