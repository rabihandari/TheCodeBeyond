import { makeStyles } from '@material-ui/core/styles';

import appBarBackground from '../../images/hero-bg.jpg';

export default makeStyles(() => ({
    appBar: {
        position: 'relative',
        background: `url(${appBarBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    appBarOverlay: {
        position: 'absolute', 
        top: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#151515', 
        opacity: '0.95'
    },
    header: {
        padding: '40px',
    },
    title: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    searchButton: {
        color: "#FFF",
        borderStyle: 'none',
    },
    navBar: {
        padding: '10px',
        margin: '0px'
    },
    navItem: {
        cursor: 'pointer',
        color: 'rgba(255,255,255,.6)',
        fontFamily: 'Metropolis',
        margin: '0px',
        '&:hover': {
            color: 'white'
        }
    },
    list: {
        backgroundColor: '#151515', 
        padding: '10px',
    },
    listItem: {
        color: 'rgba(255,255,255,.6)',
        fontSize: '14px',
        '&:hover': {
            color: 'white'
        }
    },
    listItemArrow: {
        color: 'rgba(255,255,255,.6)',
        transition: '0.5s',
        transform: 'rotate(0deg)',
        fontSize: '18px',
        marginLeft: '5px',
    }
}));