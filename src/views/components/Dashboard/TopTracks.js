import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TopTracks = ({ topTracksInfo }) => {
  console.log(topTracksInfo);
  return (
    <div class="scroll" style={{ height: "80vh", overflowY: "scroll" }}>
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
            {topTracksInfo.items.map((track, i) => (
              <TableRow
                key={track.i}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{i + 1}.</TableCell>
                <TableCell>
                  <img
                    style={{ height: "50px" }}
                    src={track.album.images[0].url}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {track.name}
                </TableCell>
                <TableCell>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TopTracks;
