import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

import {
    Box,
    IconButton,
    InputBase,
    Typography,
    useTheme,
} from "@mui/material";
import {
    Search,
    Message,
    Notifications,
    Help,

} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "redux-state";
function BasicExample({ userId, setResults }) {
    const theme = useTheme()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = Boolean(useSelector((st) => st.token))

    const user = useSelector((state) => state.user);
    const [firstName, setFirstName] = useState('');
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch()
            .then(response => response.json())
            .then(setFirstName(user.firstName))
            .catch(error => console.error(error));


    }, []);
 
  

    return (

        <Navbar bg="primary" expand="lg" className='mb-3'>
            <Container >

                <nav class="navbar  text-right justify align-right">
                    <div class="container-fluid text-right justify align-right" href="/home"
                    >

                        <Typography fontWeight="bold"
                            color="secondary.contrastText"

                            fontSize="40px"
                            onClick={() => navigate("/home")}
                        >
                            Kinning

                        </Typography>

                    </div>
                </nav>
                <FlexBetween
                    borderRadius="17px"
                    gap="3rem"
                    padding="0.1rem 5rem"
                    ml="15rem"
                >
                    <Typography
                        color="secondary.contrastText"


                    >   <input
                            type="text"
                            value={searchTerm}
                            placeholder="Search for friends..."
                            
                        />
                         <IconButton >
                            <Search />
                        </IconButton>
                        <ul>
                            {suggestions.map((suggestion) => (
                                <li key={suggestion.id}>{suggestion.name}</li>
                            ))}
                        </ul>
                       </Typography>

                </FlexBetween>
                <FlexBetween gap="2rem" className="ml-auto">

                    <div href="/messages"><Message sx={{ fontSize: "25px" }} /></div>
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                </FlexBetween>
                <p className='text-left'  >

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto text-light" >
                            <NavDropdown
                                title={firstName} id="basic-nav-dropdown">
                                <div onClick={() => navigate(`/profile/${userId}`)}><NavDropdown.Item 
                                >{firstName}</NavDropdown.Item></div>

                                <NavDropdown.Item href="/" onClick={() => dispatch(setLogout())}>
                                    Logout

                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </p>
            </Container>
        </Navbar>
    );
}

export default BasicExample;