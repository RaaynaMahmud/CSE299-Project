import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "redux-state";
import Post from "./Post";

const Posts = ({ userId, isUserProfile = false }) => {
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const getNewsfeedPosts = async () => {
        const response = await fetch("http://localhost:6001/post", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
      };
    
      const getUserPosts = async () => {
        const response = await fetch(
          `http://localhost:6001/post/${userId}/post`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      };
    useEffect(() => {
        if (isUserProfile) {
            getUserPosts();
        } else {
            getNewsfeedPosts();
        }
    }, []);

    return (
        <div>
            {
                posts.map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    }) => (
                        <Post
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}          />

                    )
                )
            }
        </div>
    )
}
export default Posts;
