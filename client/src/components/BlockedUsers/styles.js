import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export default makeStyles((theme) => ({
  mainContainer:{
    position: 'fixed',
    padding: '0',
    margin: '0',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255, 1)',
    zIndex: '1'
  },
  container: {
    maxWidth: '350px',
    padding: '20px',
    position: 'fixed',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'MetropolisBold'
  },
  body: {
    textAlign: 'center',
    fontFamily: 'MetropolisRegular'
  },
  submitButton: {
    borderRadius: '20px',
    fontSize: '13px',
    textTransform: 'none',
  },
  headerPicture: {
      height: '42px',
      width: '42px',
      fontSize: '16px',
      backgroundColor: 'blue',
  },
  username: {
    marginLeft: '15px'
  },
  blockedButton: {
    borderRadius: '20px',
    textTransform: 'none',
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