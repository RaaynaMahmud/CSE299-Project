import { Box, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import BasicExample from "scenes/navbar";
import UserWidgets from "scenes/widgets/UserWidgets";
import UserPostWidgets from "scenes/widgets/UserPostWidgets";
import FriendList from "scenes/widgets/FriendList";
import Posts from "scenes/widgets/Posts";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
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

  if (!user) return null;

  return (
    <Box>
      <BasicExample  />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="2rem"


      >
        <Box flexBasis="25%" mb="20rem">
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {/* <FriendList userId={userId} /> */}
        </Box>
        <Divider/>
        
        <Box
          flexBasis="42%" 
         
        >
          <UserPostWidgets picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <Posts userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;