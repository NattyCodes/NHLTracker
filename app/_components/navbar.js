'use client'
import { AppBar, Box, Button, Container, IconButton, Menu, MenuIcon, MenuItem, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { GiHockey } from "react-icons/gi";

export const Navbar = () => {
    const router = useRouter()
    return (
        <AppBar position="static" color='primary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <GiHockey  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, padding: '10px' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        paddingLeft: '10px',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Blueline Hockey
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {router.push(`/`)}}>Standings</Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {router.push(`/stats`)}}>Stats</Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => {router.push(`/scores`)}}>Scores</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}