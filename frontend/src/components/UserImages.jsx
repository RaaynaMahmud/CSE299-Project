import { Box } from "@mui/material";

const UserImages = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        height={size}
        width={size}
        src={`http://localhost:6001/images/${image}`}
      />
    </Box>
  );
};

export default UserImages;