import { Typography, Box, useTheme, useMediaQuery } from "@mui/material"
import Form from "./form"


const LoginPage = () => {
    const theme = useTheme()
    const screens = useMediaQuery("(min-width:100px)")
    return (
        <Box sx={{ color: 'text.disabled' }}>
            <Box width="100%"         backgroundColor={theme.palette.background.alt}
bgcolor="primary.main" p="2rem " textAlign="center">
                <Typography fontWeight="bold"
                    fontSize="41px"
                    color="text.secondary">
                    Kinning

                </Typography>
            </Box>
            <Box
                width={screens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
            >
                  <Typography  variant="h5" align="center" fontWeight="700" sx={{ mb: "1.5rem" }}>
          Welcome to Kinning!
        </Typography>
            <Form/>
            </Box>
        </Box>
    )
}
export default LoginPage