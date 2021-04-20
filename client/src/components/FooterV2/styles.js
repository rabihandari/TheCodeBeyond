import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '30px 0px',
        marginTop: '40px',
    },
    item: {
        textTransform: 'none',
        fontFamily: 'MetropolisRegular',
        margin: '0px 20px'
    },
    logoContainer: {
        cursor: 'pointer'
    },
    logo: {
        height: '30px',
        width: '30px',
    },
    appName: {
        fontFamily: 'MetropolisBold',
        marginLeft: '10px'
    }
}));