import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        cursor: 'pointer',
        padding: '20px 20px',
        maxWidth: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '25px 10px',
        },
    },
    profilePicture: {
        height: '40px',
        width: '40px',
        backgroundColor: 'blue',
        fontSize: '11px'
    },
    creatorName: {
        display: 'block',
        fontFamily: 'MetropolisBold',
    },
    creatorEmail: {
        display: 'block',
        fontFamily: 'MetropolisRegular',
        fontSize: '11px'
    },
    postTitle: {
        fontFamily: 'MetropolisBold',
        display: 'box',
        maxWidth: '80%',
        marginBottom: '5px',
        fontSize: '16px',
        lineHeight: '1.3125',
        overflow: 'hidden',
        lineClamp: '2',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    postDesc: {
        marginBottom: '10px',
        fontSize: '13px',
        maxWidth: '80%',
        fontFamily: 'MetropolisRegular',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    postDate: {
        color: 'grey',
        fontFamily: 'MetropolisRegular',
    },
    checkIcon: {
        color: '#00c500',
        marginLeft: '5px',
        fontSize: '18px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '26px'
        },
    }
}));