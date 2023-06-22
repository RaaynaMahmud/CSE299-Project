import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImages from "./UserImages";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "redux-state";
const ListOfFriends = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user);
 
  
  // const isFriend=false
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:6001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImages image={userPicturePath} size="57px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            variant="h5"            
          >
            {name}
          </Typography>
          <Typography fontSize="0.85rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ p: "0.7rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined />
        ) : (
          <PersonAddOutlined />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default ListOfFriends;