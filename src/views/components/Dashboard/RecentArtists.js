import * as React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const RecentArtists = ({ recentlyPlayed }) => {
  console.log("recentlyPlayed", recentlyPlayed);

  // filter artists
  let artistPlays = [];

  recentlyPlayed.items.forEach((t) => {
    // const artistName = t.track.artists[0].name;
    // const i = artistPlays.find((el) => (el.artist = artistName));
    // console.log(i);
    // if(!i) artistPlays.push([])
    // if (artistPlays[t.track.artists[0].name]) {
    //   artistPlays[t.track.artists[0].name] =
    //     artistPlays[t.track.artists[0].name] + 1;
    // } else {
    //   artistPlays[t.track.artists[0].name] = 1;
    // }
  });

  // artistPlays = artistPlays.sort((a,b) => a - )

  return (
    <Grid
      container
      xs={12}
      sx={{
        overflowY: "scroll",
        scrollbarWidth: 0,
        height: "85vh",
      }}
    >
      {Object.keys(artistPlays).map((artist, i) => {
        const plays = artistPlays[artist];

        let color = "red";
        if (plays > 15) color = "lime";
        else if (plays > 10) color = "yellow";
        else if (plays > 5) color = "orange";

        return (
          <Card
            sx={{
              backgroundColor: color,
              color: "white",
              margin: "20px 10px",
              height: `${100 + 10 * plays}px`,
              width: `${100 + 10 * plays}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                style={{
                  width: "100px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >{`${artist}`}</Typography>
              <Typography variant="p">Plays: {artistPlays[artist]}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Grid>
  );
};

export default RecentArtists;
