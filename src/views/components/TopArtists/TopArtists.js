import Artist from "./Artist";
import "./TopArtists.css";
import arrow from "../../assets/arrow.svg";
import { useRef, useState } from "react";

const TopArtists = ({ topArtistInfo }) => {
  const scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift); // Updates the latest scrolled postion

    //For checking if the scroll has ended
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <div className="TopArtists">
      <div className="top">
        <h1>Top Artists</h1>
        <div className="buttons">
          <button onClick={() => slide(-332)} className="scroll prev">
            <img src={arrow} alt="previous" />
          </button>
          <button onClick={() => slide(332)} className="scroll next">
            <img src={arrow} alt="next" />
          </button>
        </div>
      </div>
      <ul ref={scrl} onScroll={scrollCheck} className="artists">
        {topArtistInfo.items.map((artist, i) => (
          <Artist artist={artist} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
