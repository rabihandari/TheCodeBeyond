import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '100px 20px',
        maxWidth: '650px',
        [theme.breakpoints.down('md')]: {
            padding: '40px 20px',
        },
    },
    keysIcon: {
        padding: '20px 0',
    },
    input: {
        width: '80%',
        marginTop: '20px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    errorText: {
        color: 'red',
        marginTop: '10px'
    },
    message1: {
        padding: '20px 0',
    },
    message3: {
        padding: '10px 0',
        fontWeight: '300'
    },
    cbutton: {
        margin: '20px 5px',
        textTransform: 'none'
    },
    link: {
        cursor: 'pointer'
    }
}))