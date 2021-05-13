import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '40px 20px',
    },
    title: {
        display: 'block',
        fontWeight: '800',
    },
    description: {
        display: 'block',
        fontFamily: 'MetropolisRegular',
        color: 'grey',
        marginBottom: '10px'
    },
    createdAt: {
        display: 'block',
        fontFamily: 'MetropolisRegular',
        color: 'grey',
    },
    nothingYet: {
        textAlign: 'center',
        fontFamily: 'MetropolisRegular',
        marginTop: '60px'
    },
    requestPost: {
        textAlign: 'center',
        fontSize: '12px',
        fontFamily: 'MetropolisRegular',
        marginTop: '20px',
        cursor: 'pointer'
    },
    viewAnswersButton: {
        textTransform: 'none',
        marginTop: '10px',
        marginBottom: '10px',
    },
    postContainer: {
        padding: '10px',
        cursor: 'pointer'
    },
    postTitle: {
        fontFamily: 'MetropolisBold'
    },
    imageFile: {
        height: '70px',
        maxWidth: '70px',
        marginRight: '10px',
        objectFit: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    }
}));

export const CustomIndeterminate = withStyles((theme) => ({
    root: {
      height: 1,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: '#FFF',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#3f51b5',
    },
  }))(LinearProgress);