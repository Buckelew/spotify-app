import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Spotify from "../../assets/Spotify_Icon_RGB_White.png";

const RecentTracks = ({ tracks }) => {
  console.log("tracks", tracks);
  return (
    <div
      class="scroll"
      style={{ height: "80vh", width: "50vw", overflowY: "scroll" }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Song Name</TableCell>
              <TableCell>Artist(s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track, i) => (
              <TableRow
                key={track.i}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{i + 1}.</TableCell>
                <TableCell>
                  <img
                    style={{ height: "50px", cursor: "pointer" }}
                    src={track.album.images[0].url}
                    onClick={() =>
                      window.open(track.album.external_urls.spotify)
                    }
                  />
                  <img
                    src={Spotify}
                    alt="spotify logo"
                    style={{
                      height: "25px",
                      marginLeft: "10px",
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(track.external_urls.spotify)}
                  >
                    {track.name}
                  </span>
                </TableCell>
                <TableCell sx={{ maxWidth: "200px" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(track.artists[0].external_urls.spotify)
                    }
                  >
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentTracks;
