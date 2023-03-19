import Artist from "./Artist";
import "./TopArtists.css";
import arrow from "../../assets/arrow.svg";
import { useEffect, useRef, useState } from "react";

const TopArtists = ({ topArtistInfo }) => {
  const scrl = useRef(null);
  const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion

  console.log(scrollX);
  useEffect(() => {
    console.log(scrl.current.scrollWidth);
    scrl.current.scrollLeft = scrollX;
  }, [scrollX]);

  const slide = (shift) => {
    // scrl.current.scrollLeft += shift;
    if (scrollX + shift > 0 && scrollX + shift < scrl.current.scrollWidth) {
      setScrollX(scrollX + shift); // Updates the latest scrolled postion
    } else if (scrollX + shift > scrl.current.scrollWidth) {
      setScrollX(0);
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
      {/* <ul ref={scrl} onScroll={scrollCheck} className="artists"> */}
      <ul ref={scrl} className="artists">
        {topArtistInfo.items.map((artist, i) => (
          <Artist artist={artist} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
