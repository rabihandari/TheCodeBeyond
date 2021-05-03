import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '80px 20px',
        maxWidth: '1000px',
        [theme.breakpoints.down('md')]: {
            padding: '40px 20px',
        },
    },
    formContainer: {
        maxWidth: '480px',
    },
    image: {
        display: 'block',
        [theme.breakpoints.down('md')]: {
            margin: 'auto',
        },
    },
    title: {
        fontFamily: 'MetropolisBold',
        marginBottom: '10px',
    },
    errors: {
        fontFamily: 'MetropolisRegular',
        color: 'red',
        display: 'block',
    },
    textField: {
        marginTop: '20px',
    },
    formButton: {
        textTransform: 'none',
        borderRadius: '50px'
    }
}));