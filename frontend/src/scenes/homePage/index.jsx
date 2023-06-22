import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import FriendList from "scenes/widgets/FriendList";
import Posts from "scenes/widgets/Posts";
import Navbar from "scenes/navbar";
import UserWidgets from "scenes/widgets/UserWidgets";
import UserPostWidgets from "scenes/widgets/UserPostWidgets";


const HomePage = () => {
    const { _id, picturePath } = useSelector((st) => st.user)
    return (<Box>
        <Navbar />
        <Box
            width="100%"
            justifyContent="left"
            padding="1rem 7%"
            gap="0.6rem"
            style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr' }}
        >
            <Box  >
                
            <div style={{
                    backgroundColor: 'white',
                }} className="shadow p-3 mb-5">

                <UserWidgets userId={_id} picturePath={picturePath} />
               </div>
               <Box flexBasis="10%">
            <FriendList userId={_id} />
          </Box>
            </Box>
            <Box ml="2rem"
            >
                <div width={300} height={300} style={{
                    backgroundColor: 'white',
                }} className="shadow p-3 mb-5">                
                <UserPostWidgets picturePath={picturePath} />
                </div>
                <div width={300} height={300} style={{
                    backgroundColor: 'white',
                }} className="shadow-lg  mb-5  rounded">
                    <Posts userId={_id} />
                </div>

            </Box>
          
        </Box>

    </Box>
    )
}
export default HomePage