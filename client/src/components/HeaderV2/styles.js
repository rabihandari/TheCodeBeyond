import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '30px 40px',
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
        marginLeft: '10px',
        fontWeight: "900",
    },
    rightContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    loginButton: {
        textTransform: 'none',
    },
    signupButton: {
        fontWeight: '300',
        textTransform: 'none',
        marginLeft: '10px',
        minInlineSize: 'max-content',
    },
    addPostButton: {
        fontSize: '12px',
        lineHeight: '25px',
        marginLeft: '10px',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontFamily: 'MetropolisRegular',
        textTransform: 'none',

    }
}));