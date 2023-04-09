import React from 'react';
import { Avatar, Stack, Typography } from "@mui/material";
import Form from "../components/form/Form";
import Footer from "../components/Footer";
import avatar from "../assets/images/ic_user/ic_user.png"

function SignupPage() {
    return (
        <div>
            <Stack
                width="50%"
                margin="auto"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Avatar
                    src={avatar} alt="avatar"
                    sx={{
                        width: 100,
                        height: 100,
                        background: "#D3D3D3",
                        padding: "32px"
                    }}
                />
                <Typography variant="h3" fontWeight="bold">Welcome!</Typography>
                <Stack alignItems="center" >
                    <Typography sx={{ fontSize: "20px" }}>Let's connect to your workspace.</Typography>
                    <Typography sx={{ fontSize: "20px" }}>Please register to continue.</Typography>
                </Stack>
                <Form formType="signup" />
            </Stack>
            <Footer />
        </div>
    );
};

export default SignupPage;

