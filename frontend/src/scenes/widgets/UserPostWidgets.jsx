import {
    EditOutlined,
    DeleteOutlined,
  ImageOutlined,
    } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImages from "components/UserImages";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "redux-state";
  import { createTheme, ThemeProvider } from '@mui/material/styles';

  const theme = createTheme({
   padding: "0rem 1.5rem  0rem",
  borderRadius: ".75rem",
  });

  const UserPostWidgets = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [post, setPost] = useState("");
   
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:6001/post`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    };
  
    return (
        // <div>jjjj</div>

<ThemeProvider theme={theme} >     
    
        <FlexBetween gap="1rem"  
>
          <UserImages image={picturePath} />
          <InputBase
            placeholder="What's on your mind."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              borderRadius: "2rem",
              padding: "1rem 1rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "17%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined />
            <Typography
              sx={{ "&:hover": { cursor: "pointer"} }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>

        </ThemeProvider>  
    );
  };
  
  export default UserPostWidgets;