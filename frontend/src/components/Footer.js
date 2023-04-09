import React from 'react';
import { Box, Link, Stack, Typography } from "@mui/material";
import logo from "../assets/images/zaperon_logo/zaperon_logo.png"

function Footer() {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                width: '100%',
                marginTop: "3rem"
            }}
        >
        <Stack direction="row" spacing={2}>
            <Typography sx={{ fontSize: "20px" }}>Powered by</Typography>
            <img src={logo} alt="logo" />
        </Stack>
        <Stack direction="row" spacing={3}>
            <Link sx={{ fontSize: "20px" }} underline="none">Need Help?</Link>
            <Link sx={{ fontSize: "20px" }} underline="none">Privacy Policy & Terms</Link>
        </Stack>
        </Stack>
    );
};

export default Footer;

