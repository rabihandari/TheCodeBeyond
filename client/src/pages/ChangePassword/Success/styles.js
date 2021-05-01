import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '140px 20px',
        marginBottom: '60px',
        [theme.breakpoints.down('md')]: {
            padding: '40px 20px',
        },
    },
    tickIcon: {
        padding: '20px 0',
    },
    message1: {
        padding: '20px 0',
        fontWeight: '400'
    },
    message2: {
        padding: '10px 0',
    },
    message3: {
        width: '50%',
        fontWeight: '300'
    },
    login: {
        margin: '20px 0',
        textTransform: 'none'
    },
    link: {
        cursor: 'pointer'
    }
}))