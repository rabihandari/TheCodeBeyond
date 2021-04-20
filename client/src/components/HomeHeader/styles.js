import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '0px 40px',
        marginTop: '40px',
        [theme.breakpoints.down('md')]: {
            padding: '0px 10px',
        },
    },
    title: {
        fontFamily: 'MetropolisBold',
        marginLeft: '10px'
    },
    divider: {
        marginTop: '10px',
        width: '80%',
        backgroundColor: '#80808061',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    requestPost: {
        fontFamily: 'MetropolisRegular',
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            padding: '0px',
        },
    },
    requestLink: {
        cursor: 'pointer',
        fontFamily: 'MetropolisBold',
    }
}));