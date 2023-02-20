import React, {useState, useEffect} from 'react';
import {
  useMediaQuery, AppBar, Toolbar, Box, Button, MenuItem, Menu,
  IconButton, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {styled, useTheme} from '@mui/material/styles';
import Header from './Header';

function createPage(page, link) {
  return {page, link};
}

const NavbarButton = styled(Button)({
  disableElevation: true,
  variant: 'subtitle2',
  color: '#FFFFFF',
  backgroundColor: 'transparent',
});

export default function Navbar(props) {
  const isMobileView = useMediaQuery('(max-width: 1000px)');

  const [pages, setPages] = useState([]);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goToPage = (pageLink) => () => {
    window.location.href = pageLink;
  };

  useEffect(() => {
    const newPages = [];

    // if (userData.isAuthenticated && userData.isTA) {
    //   newPages.push(createPage('Settings', 'settings'));
    //   newPages.push(createPage('Metrics', 'metrics'));
    // }

    setPages(newPages);
  }, []);


  if (isMobileView) {
    return (
      <AppBar position="static" enableColorOnDark sx={{ mb: 3 }}>
        <Toolbar sx={{display: 'flex space-between'}}>
          {
            (pages && pages.length > 0) &&
            <Box sx={{flexGrow: 1, display: 'flex'}}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="navbar-menu"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{display: 'block'}}
              >
                {
                  pages?.map((page) => (
                    <MenuItem key={page.page} onClick={goToPage(page.link)}>
                      <Typography variant='subtitle2' sx={{mx: 2}}>
                        {page.page}
                      </Typography>
                    </MenuItem>
                  ))
                }
              </Menu>
            </Box>
          }

          <Box sx={{flexGrow: 1, display: 'flex'}} >
            <Header/>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  // Desktop view
  return (
    <AppBar position="sticky" enableColorOnDark sx={{ mb: 3 }}>
      <Toolbar sx={{display: 'flex space-between'}}>
      <Box sx={{flexGrow: 1, display: 'flex'}}>
          <Header/>
        </Box>
        <Box sx={{flexGrow: 0, display: 'flex'}}>
          {
            pages?.map((page) => (
              <NavbarButton key={page.page} href={page.link}>{page.page}</NavbarButton>
            ))
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}
