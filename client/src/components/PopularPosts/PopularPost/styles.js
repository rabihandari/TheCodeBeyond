import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        marginBottom: '40px',
        height: '69px',
        maxWidth: '380px',
    },
    media: {
        width: '69px',
        height: '69px',
    },
    content: {
        padding: '0px 20px',
    },
    contentTitle: {
        fontSize: '16px',
        fontFamily: 'MetropolisBold',
        lineHeight: '1.3125',
        overflow: 'hidden',
        lineClamp: '2',
        maxWidth: '250px',
        display: 'box',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
        marginBottom: '5px',
        transition: '0.5s',
    },
    contentCreator: {
        fontSize: '13px',
        fontFamily: 'MetropolisRegular',
        color: '#7f7f7f',
        maxWidth: '250px',
        overflow: 'hidden',
        lineClamp: '1',
        display: 'box',
        textOverflow: 'ellipsis',
        boxOrient: 'vertical',
    },
}));