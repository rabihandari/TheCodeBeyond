import { makeStyles } from '@material-ui/core/styles';

import appBarBackground from '../../images/hero-bg.jpg';

export default makeStyles((theme) => ({
    container: {
        padding: '100px 0px 50px 0px',
        position: 'relative',
        background: `url(${appBarBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    appName: {
        color: 'white',
        fontFamily: 'MetropolisRegular',
        marginLeft: '20px'
    },
    leftSide: {
        padding: '30px'
    },
    
    description: {
        padding: '10px 0px',
        color: 'rgba(255,255,255,.4)',
        fontFamily: 'MetropolisRegular',
        display: 'block',
        lineHeight: '2',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
    },
    item: {
        padding: '30px',
    },
    footerOverlay: {
        position: 'absolute', 
        top: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#151515', 
        opacity: '0.95',
    },
}));