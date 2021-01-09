import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, AppBar, Typography, Grid, Divider, Paper, Popper, Grow, MenuList, MenuItem } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

import useStyles from './styles';
import SocialMedia from '../Shared/SocialMedia/SocialMedia';
import LinearIndeterminate from '../LinearIndeterminate/LinearIndeterminate';
import SearchBar from './SearchBar/SearchBar';

const Header = (props) => {
    const classes = useStyles();
    const isLoading = useSelector((state) => state.loadingIndeterminate);
    

    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef();

    const openList = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeList = (event) => {
        setAnchorEl(null);
    };
 
    const open = Boolean(anchorEl);


    return(
        <header>
            <AppBar className={classes.appBar}>
                <div className={classes.appBarOverlay}></div>
                <Container style={{zIndex: '1', width: '100%',maxWidth: 1400,}}>
                    
                    <Grid container direction="row" justify="space-between" alignItems="center" className={classes.header}>
                        <Grid item xs={12} md={4}>
                            <SocialMedia />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4" className={classes.title}>The Code Beyond</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
                            <SearchBar {...props}/>
                        </Grid>
                    </Grid>

                    <Divider variant="middle" style={{backgroundColor: "rgb(121 121 121 / 93%)"}}/>

                    <Grid container direction="row" justify="center" alignItems="center" spacing={5} className={classes.navBar}>
                        <Grid item>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" className={classes.navItem}>Home</Typography>
                            </Link>
                        </Grid>
                        
                        <Grid item onMouseOver={openList} onMouseLeave={closeList} ref={anchorRef}>
                            <Grid container direction="row" alignItems="center" justify="center">
                                <Typography variant="body2" className={classes.navItem}>Categories</Typography>
                                <KeyboardArrowDown className={classes.listItemArrow} style={ anchorEl && { transform: 'rotate(180deg)' }}/>
                            </Grid>
                            <Popper open={open} transition disablePortal anchorEl={anchorRef.current}>
                                <Grow in timeout={1000} style={{ transformOrigin: '0 0 0'}}>
                                    <Paper className={classes.list}>
                                        <MenuList>
                                            <MenuItem className={classes.listItem} onClick={closeList}>Profile</MenuItem>
                                            <MenuItem className={classes.listItem} onClick={closeList}>My account</MenuItem>
                                            <MenuItem className={classes.listItem} onClick={closeList}>Logout</MenuItem>
                                        </MenuList>
                                    </Paper>
                                </Grow>
                            </Popper>
                        </Grid>
                        
                        <Grid item>
                            <Link to="/about" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" className={classes.navItem}>About</Typography>
                            </Link>
                        </Grid>
                        
                        <Grid item>
                            <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" className={classes.navItem}>Contact</Typography>
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link to="/createPost" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" className={classes.navItem}>Create Post</Typography>
                            </Link>
                        </Grid>
                    </Grid>

                </Container>


                {isLoading && <LinearIndeterminate />}

            </AppBar>
        </header>
    );
}

export default Header;