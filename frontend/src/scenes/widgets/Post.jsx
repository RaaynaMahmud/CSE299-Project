import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import ListOfFriends from "components/ListOfFriends";
  import Widgets from "components/Widgets";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "redux-state";
  
  const Post = ({
    postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
  }) => {
    const loggedInUserId = useSelector((state) => state.user._id);
    const dispatch = useDispatch();
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [isComments, setIsComments] = useState(false);
    const token = useSelector((state) => state.token);


  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:6001/post/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    return (
      <Widgets m="3rem 0" sx={{ borderBottom: 2 }} className="mb-5">
        <ListOfFriends
          friendId={postUserId}
          name={name}
          userPicturePath={userPicturePath}
        />
       
        <Typography  sx={{ mt: "2rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
          height="auto"
            width="100%"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:6001/images/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1.25rem">
            <FlexBetween gap="0.31rem">
               <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined  />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton> 
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.31rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      </Widgets>
    );
  };
  
  export default Post;