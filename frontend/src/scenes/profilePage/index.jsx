
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { useParams } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import Posts from "scenes/widgets/Posts";
import BasicExample from "scenes/navbar";
import UserPostWidgets from "scenes/widgets/UserPostWidgets";
import FriendList from "scenes/widgets/FriendList";
import { Box, Divider } from '@mui/material';
import { setPosts } from "redux-state";

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  const dispatch = useDispatch();
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
    getUser();
    getUserPosts();
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
    <div >
      <BasicExample />

      <div className="container emp-profile " >

        <form method="" className="shadow-lg p-3 mb-5 bg-white rounded" style={{
      backgroundColor: 'white',
      
    }}  sx={{ borderBottom: 1 }} >
          <div className='row'>
            <div className="col-md-4 ">
              <img align="start" src={`http://localhost:6001/images/${user.picturePath}`}
                width={300} height={300}
                style={{ objectFit: "cover" }}
                sx={{ borderRadius: '16px' }}
                alt="user"
              ></img>

            </div>
            <div className="col-md-6 ">
              <div className='profile-head'>
                <h1> {firstName} {lastName}</h1>
                <h5>{location}</h5>
                <p className="prfile-rating mt-3 mb-5" >{occupation}</p>
              </div>
            </div>
          </div>

        </form>
        <Divider />
      <Box  align="start" flexBasis="100%" padding=".5rem 20%"
        display="flex" > 
         <div width={300} height={300} style={{
      backgroundColor: 'white',
    }} className="shadow-lg   rounded">
          <Posts userId={userId} isUserProfile />
        </div>
        </Box>


      </div>
    </div>
  )

}

export default ProfilePage;