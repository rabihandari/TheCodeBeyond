import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        cursor: 'pointer',
        padding: '0px 20px',
    },
    postImage: {
        maxWidth: '90%',
        width: '200px',
        height: '130px',
    },
    profilePicture: {
        height: '20px',
        width: '20px',
        cursor: 'pointer',
        backgroundColor: 'blue',
        marginBottom: '10px',
        fontSize: '11px'
    },
    postCreator: {
        marginLeft: '10px',
        marginBottom: '10px',
        display: 'box',
        fontFamily: 'MetropolisRegular',
        maxWidth: '95%',
        lineHeight: '1.3125',
        overflow: 'hidden',
        lineClamp: '2',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    postTitle: {
        fontFamily: 'MetropolisBold',
        display: 'box',
        maxWidth: '95%',
        marginBottom: '10px',
        fontSize: '20px',
        lineHeight: '1.3125',
        overflow: 'hidden',
        lineClamp: '2',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    postDate: {
        color: 'grey',
        fontFamily: 'MetropolisRegular',
    },
}));