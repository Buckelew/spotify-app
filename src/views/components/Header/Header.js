import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ handleLogout, accessToken }) => {
  if (accessToken)
    return (
      <Box
        sx={{
          height: 50,
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <LogoutIcon
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleLogout}
        />
      </Box>
    );
};

export default Header;
