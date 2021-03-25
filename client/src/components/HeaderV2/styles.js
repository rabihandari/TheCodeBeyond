import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '20px 40px',
    },
    leftContainer: {
        display: 'flex',
        cursor: 'pointer',
    },
    logo: {
        height: '40px',
        width: '40px',
    },
    title: {
        alignSelf: 'center',
        color: '#373435',
        marginLeft: '20px',
        fontWeight: "900",
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    loginButton: {
        textTransform: 'none',
    },
    signupButton: {
        textTransform: 'none',
        marginLeft: '10px',
        minInlineSize: 'max-content',
    }
}));