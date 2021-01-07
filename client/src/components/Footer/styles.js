import { makeStyles } from '@material-ui/core/styles';

import appBarBackground from '../../images/hero-bg.jpg';

export default makeStyles(() => ({
    container: {
        padding: '100px 0px 50px 0px',
        position: 'relative',
        background: `url(${appBarBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
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