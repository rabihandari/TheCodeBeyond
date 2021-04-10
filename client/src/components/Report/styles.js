import { makeStyles } from '@material-ui/core/styles';

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
    maxWidth: '450px',
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
  cancelButton: {
    borderRadius: '20px',
    fontSize: '13px',
    textTransform: 'none',
  },
  reportButton: {
    borderRadius: '20px',
    fontSize: '13px',
    textTransform: 'none',
  }
}));