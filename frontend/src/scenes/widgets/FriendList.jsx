import { Box, Typography, useTheme } from "@mui/material";
import ListOfFriends from "components/ListOfFriends";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "redux-state";
import Widgets from "components/Widgets";
import { useEffect } from "react";


const FriendList= ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((st) => st.token);
  const friends = useSelector((st) => st.user.friends);
  const { palette } = useTheme();
 

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:6001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); 
  return (
    <Widgets width={280}  style={{
      backgroundColor: 'white',
  }} className="shadow p-3 mb-5 m">
      <Box sx={{ color: 'primary.main' }} > 

      <Typography
        color={palette.primary}
        variant="h5"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      </Box>
      <Box flexDirection="column" display="flex"  gap="1.5rem">
        {friends.map((ele) => (
          <
          ListOfFriends
            key={ele._id}
            friendId={ele._id}
            name={`${ele.firstName} ${ele.lastName}`}
            subtitle={ele.occupation}
            userPicturePath={ele.picturePath}
          />
        ))}
      </Box>
    </Widgets>
  );
};


export default FriendList;