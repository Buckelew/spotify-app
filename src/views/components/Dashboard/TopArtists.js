import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";

const TopArtists = ({ topArtistInfo }) => {
  return (
    <Grid
      container
      xs={12}
      sx={{
        overflowY: "scroll",
        height: "85vh",
      }}
    >
      {topArtistInfo.items.map((topArtist, i) => (
        <Grid key={i} item xs="auto" sx={{ margin: "20px" }}>
          <Card
            sx={{
              backgroundColor: "#212121",
              color: "white",
            }}
          >
            <CardActionArea
              onClick={() => window.open(topArtist.external_urls.spotify)}
            >
              <CardMedia
                component="img"
                sx={{ width: 300, height: 300 }}
                image={topArtist.images[2].url}
              />
              <CardContent>
                <Typography sx={{ fontWeight: "bold" }} variant="h5">{`${
                  i + 1
                }. ${topArtist.name}`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopArtists;
