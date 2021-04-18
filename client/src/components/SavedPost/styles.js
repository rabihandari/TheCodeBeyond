import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '40px 0px',
    },
    title: {
        display: 'block',
        fontWeight: '700',
        maxWidth: '80%',
    },
    postContainer: {
        marginBottom: '30px',
    },
    description: {
        display: 'box',
        fontFamily: 'MetropolisRegular',
        color: 'grey',
        marginBottom: '10px',
        maxWidth: '80%',
        marginTop: '5px',
        lineHeight: '1.3125',
        overflow: 'hidden',
        lineClamp: '2',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
    },
    createdAt: {
        display: 'block',
        fontFamily: 'MetropolisRegular',
        color: 'grey',
        maxWidth: '80%',
    },
    nothingYet: {
        textAlign: 'center',
        fontFamily: 'MetropolisRegular',
        marginTop: '60px'
    },
    creatorName: {
        color: 'blue',
        cursor: 'pointer'
    },
    postImage: {
        width: '80px',
        height: '80px',
    },
    removeButton: {
        fontSize: '12px',
        textTransform: 'none',
        marginTop: '15px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
        },
    },
    viewButton: {
        fontSize: '12px',
        textTransform: 'none',
        marginTop: '15px',
        marginLeft: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
        },
    }
}));