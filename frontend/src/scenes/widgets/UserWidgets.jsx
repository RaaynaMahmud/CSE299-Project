import {
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImages from "components/UserImages";
import FlexBetween from "components/FlexBetween";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  borderRadius: "0.75rem",
});

const UserWidgets = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
  } = user;

  return (



    <Box         

    >
      <ThemeProvider theme={theme} sx={{ borderRadius: '18px' }} >
        <FlexBetween
          pb="1.25rem"
          gap="0.55rem"


          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem"

          >
            <UserImages image={picturePath} />
            <Box alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
                mr="1rem"
              >
                {firstName} {lastName}
              </Typography>
              <Typography >{friends.length } friends</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <Divider />

        <Box p="1rem 0">
          <Box display="flex" alignItems="center"  mb="0.55rem">
            <LocationOnOutlined fontSize="large" />
            <Typography>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" />
            <Typography >{occupation}</Typography>
          </Box>
        </Box>

        <Divider />




      </ThemeProvider>
    </Box>);
};

export default UserWidgets;